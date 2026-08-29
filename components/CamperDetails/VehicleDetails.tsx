import type { Camper } from "@/types/camper";

import styles from "./CamperDetails.module.css";

interface VehicleDetailsProps {
  camper: Camper;
}

export default function VehicleDetails({ camper }: VehicleDetailsProps) {
  return (
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
  );
}
