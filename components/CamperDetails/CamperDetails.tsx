"use client";

import Image from "next/image";
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
        <div className={styles.topSection}>
          <div className={styles.galleryColumn}>
            <CamperGallery gallery={camper.gallery} />
          </div>

          <div className={styles.infoColumn}>
            <div className={styles.camperInfo}>
              <h1 className={styles.title}>{camper.name}</h1>

              <div className={styles.meta}>
                <div className={styles.rating}>
                  <Image
                    src="/icons/star.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />

                  <span>
                    {camper.rating}({camper.totalReviews} Reviews)
                  </span>
                </div>

                <div className={styles.location}>
                  <Image
                    src="/icons/map.svg"
                    alt=""
                    width={16}
                    height={16}
                    aria-hidden="true"
                  />

                  <span>{camper.location}</span>
                </div>
              </div>

              <p className={styles.price}>€{camper.price}</p>

              <p className={styles.description}>{camper.description}</p>
            </div>

            <div className={styles.vehicleDetails}>
              <h2 className={styles.vehicleTitle}>Vehicle details</h2>

              <div className={styles.amenities}>
                {camper.amenities.map((amenity) => (
                  <span key={amenity} className={styles.amenity}>
                    {amenity}
                  </span>
                ))}
              </div>

              <div className={styles.divider} />
              <div className={styles.specifications}>
                <div className={styles.specification}>
                  <span>Form</span>
                  <span>{camper.form}</span>
                </div>

                <div className={styles.specification}>
                  <span>Length</span>
                  <span>{camper.length}</span>
                </div>

                <div className={styles.specification}>
                  <span>Width</span>
                  <span>{camper.width}</span>
                </div>

                <div className={styles.specification}>
                  <span>Height</span>
                  <span>{camper.height}</span>
                </div>

                <div className={styles.specification}>
                  <span>Tank</span>
                  <span>{camper.tank}</span>
                </div>

                <div className={styles.specification}>
                  <span>Consumption</span>
                  <span>{camper.consumption}</span>
                </div>
              </div>
            </div>
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
