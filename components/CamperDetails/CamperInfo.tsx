import type { Camper } from "@/types/camper";

import CamperMeta from "./CamperMeta";

import styles from "./CamperDetails.module.css";

interface CamperInfoProps {
  camper: Camper;
}

export default function CamperInfo({ camper }: CamperInfoProps) {
  return (
    <div className={styles.camperInfo}>
      <h1 className={styles.title}>{camper.name}</h1>

      <CamperMeta
        rating={camper.rating}
        totalReviews={camper.totalReviews}
        location={camper.location}
      />

      <p className={styles.price}>€{camper.price}</p>

      <p className={styles.description}>{camper.description}</p>
    </div>
  );
}
