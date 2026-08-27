import Image from "next/image";
import Link from "next/link";
import type { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

const formatForm = (form: Camper["form"]) => {
  const labels: Record<Camper["form"], string> = {
    alcove: "Alcove",
    panel_van: "Panel Van",
    integrated: "Integrated",
    semi_integrated: "Semi Integrated",
  };

  return labels[form];
};

const formatEngine = (engine: Camper["engine"]) => {
  return engine.charAt(0).toUpperCase() + engine.slice(1);
};

const formatTransmission = (transmission: Camper["transmission"]) => {
  return transmission.charAt(0).toUpperCase() + transmission.slice(1);
};

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          className={styles.image}
          sizes="(max-width: 900px) 100vw, 270px"
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
          <span className={styles.badge}>
            <Image
              src="/icons/kitchen.svg"
              alt=""
              width={20}
              height={20}
              className={styles.badgeIcon}
              aria-hidden="true"
            />

            {formatEngine(camper.engine)}
          </span>

          <span className={styles.badge}>
            <Image
              src="/icons/transmission.svg"
              alt=""
              width={20}
              height={20}
              className={styles.badgeIcon}
              aria-hidden="true"
            />
            {formatTransmission(camper.transmission)}
          </span>

          <span className={styles.badge}>
            <Image
              src="/icons/form.svg"
              alt=""
              width={20}
              height={20}
              className={styles.badgeIcon}
              aria-hidden="true"
            />
            {formatForm(camper.form)}
          </span>
        </div>

        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </article>
  );
}
