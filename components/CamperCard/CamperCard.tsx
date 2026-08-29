import Image from "next/image";
import Link from "next/link";

import type { Camper } from "@/types/camper";

import CamperBadge from "./CamperBadge";
import {
  formatEngine,
  formatForm,
  formatTransmission,
} from "./camperCard.utils";

import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
  priority?: boolean;
}

export default function CamperCard({
  camper,
  priority = false,
}: CamperCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          className={styles.image}
          sizes="(max-width: 900px) 100vw, 270px"
          priority={priority}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <h2 className={styles.name}>{camper.name}</h2>

          <p className={styles.price}>€{camper.price}</p>
        </div>

        <div className={styles.meta}>
          <span className={styles.rating}>
            <Image
              src="/icons/star.svg"
              alt=""
              width={15}
              height={14}
              className={styles.starIcon}
              aria-hidden="true"
            />

            <span>
              {camper.rating}
              {camper.totalReviews > 0 && ` (${camper.totalReviews} Reviews)`}
            </span>
          </span>

          <span className={styles.location}>
            <Image
              src="/icons/map.svg"
              alt=""
              width={16}
              height={16}
              className={styles.metaIcon}
              aria-hidden="true"
            />

            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.details}>
          <CamperBadge
            icon="/icons/kitchen.svg"
            label={formatEngine(camper.engine)}
          />

          <CamperBadge
            icon="/icons/transmission.svg"
            label={formatTransmission(camper.transmission)}
          />

          <CamperBadge icon="/icons/form.svg" label={formatForm(camper.form)} />
        </div>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
