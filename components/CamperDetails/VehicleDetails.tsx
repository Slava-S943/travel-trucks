import type { Camper } from "@/types/camper";

import styles from "./CamperDetails.module.css";

interface VehicleDetailsProps {
  camper: Camper;
}

export default function VehicleDetails({ camper }: VehicleDetailsProps) {
  return (
    <div className={styles.vehicleDetails}>
      <h2 className={styles.vehicleTitle}>Vehicle details</h2>

      <ul className={styles.amenities}>
        {camper.amenities.map((amenity) => (
          <li key={amenity} className={styles.amenity}>
            {amenity}
          </li>
        ))}
      </ul>

      <div className={styles.divider} />

      <dl className={styles.specifications}>
        <div className={styles.specification}>
          <dt>Form</dt>
          <dd>{camper.form}</dd>
        </div>

        <div className={styles.specification}>
          <dt>Length</dt>
          <dd>{camper.length}</dd>
        </div>

        <div className={styles.specification}>
          <dt>Width</dt>
          <dd>{camper.width}</dd>
        </div>

        <div className={styles.specification}>
          <dt>Height</dt>
          <dd>{camper.height}</dd>
        </div>

        <div className={styles.specification}>
          <dt>Tank</dt>
          <dd>{camper.tank}</dd>
        </div>

        <div className={styles.specification}>
          <dt>Consumption</dt>
          <dd>{camper.consumption}</dd>
        </div>
      </dl>
    </div>
  );
}
