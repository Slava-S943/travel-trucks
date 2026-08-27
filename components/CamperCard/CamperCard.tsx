import Image from "next/image";
import Link from "next/link";
import type { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, 300px"
          loading="eager"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.name}>{camper.name}</h2>

          <p className={styles.price}>€{camper.price}</p>
        </div>

        <div className={styles.meta}>
          <span>
            ★ {camper.rating} ({camper.totalReviews} reviews)
          </span>

          <span>{camper.location}</span>
        </div>

        <div className={styles.details}>
          <span>{camper.form}</span>
          <span>{camper.transmission}</span>
          <span>{camper.engine}</span>
        </div>

        <div className={styles.amenities}>
          {camper.amenities.map((amenity) => (
            <span key={amenity} className={styles.amenity}>
              {amenity}
            </span>
          ))}
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
