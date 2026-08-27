"use client";

import { useQuery } from "@tanstack/react-query";
import { getCamper } from "@/lib/api/campers";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperReviews from "@/components/CamperReviews/CamperReviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./CamperDetails.module.css";

interface CamperDetailsProps {
  camperId: string;
}

export default function CamperDetails({ camperId }: CamperDetailsProps) {
  const {
    data: camper,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamper(camperId),
  });

  if (isLoading) {
    return <p className={styles.message}>Loading camper...</p>;
  }

  if (isError) {
    return (
      <p className={styles.message}>
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  if (!camper) {
    return <p className={styles.message}>Camper not found.</p>;
  }

  return (
    <main className={styles.main}>
      <section className={styles.details}>
        <h1 className={styles.title}>{camper.name}</h1>

        <CamperGallery gallery={camper.gallery} />

        <p>Rating: {camper.rating}</p>
        <p>Reviews: {camper.totalReviews}</p>
        <p>Location: {camper.location}</p>
        <p>Price: €{camper.price}</p>

        <p>Form: {camper.form}</p>
        <p>Transmission: {camper.transmission}</p>
        <p>Engine: {camper.engine}</p>

        <p>Length: {camper.length}</p>
        <p>Width: {camper.width}</p>
        <p>Height: {camper.height}</p>
        <p>Tank: {camper.tank}</p>
        <p>Consumption: {camper.consumption}</p>

        <h2>Amenities</h2>

        <ul>
          {camper.amenities.map((amenity) => (
            <li key={amenity}>{amenity}</li>
          ))}
        </ul>

        <CamperReviews camperId={camper.id} />

        <BookingForm camperId={camper.id} />
      </section>
    </main>
  );
}
