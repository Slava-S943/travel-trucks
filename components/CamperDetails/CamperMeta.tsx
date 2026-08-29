import Image from "next/image";

import type { Camper } from "@/types/camper";

import styles from "./CamperDetails.module.css";

interface CamperMetaProps {
  rating: Camper["rating"];
  totalReviews: Camper["totalReviews"];
  location: Camper["location"];
}

export default function CamperMeta({
  rating,
  totalReviews,
  location,
}: CamperMetaProps) {
  return (
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
          {rating}({totalReviews} Reviews)
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

        <span>{location}</span>
      </div>
    </div>
  );
}
