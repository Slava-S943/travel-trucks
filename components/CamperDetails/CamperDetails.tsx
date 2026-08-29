"use client";

import { useQuery } from "@tanstack/react-query";

import { getCamper } from "@/lib/api/campers";

import CamperGallery from "@/components/CamperGallery/CamperGallery";
import CamperReviews from "@/components/CamperReviews/CamperReviews";
import BookingForm from "@/components/BookingForm/BookingForm";

import CamperInfo from "./CamperInfo";
import VehicleDetails from "./VehicleDetails";

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
        <div className={styles.topSection}>
          <div className={styles.galleryColumn}>
            <CamperGallery gallery={camper.gallery} />
          </div>

          <div className={styles.infoColumn}>
            <CamperInfo camper={camper} />
            <VehicleDetails camper={camper} />
          </div>
        </div>

        <div className={styles.bottomSection}>
          <CamperReviews camperId={camper.id} />
          <BookingForm camperId={camper.id} />
        </div>
      </section>
    </main>
  );
}
