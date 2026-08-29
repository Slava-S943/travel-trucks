"use client";

import Image from "next/image";
import type { CamperGalleryItem } from "@/types/camper";
import styles from "./CamperGallery.module.css";

interface CamperGalleryProps {
  gallery: CamperGalleryItem[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const mainImage = gallery[0];

  if (!mainImage) {
    return null;
  }

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <Image
          src={mainImage.original}
          alt="Camper"
          fill
          className={styles.mainImage}
          sizes="638px"
        />
      </div>

      <div className={styles.thumbnails}>
        {gallery.slice(0, 4).map((image) => (
          <div key={image.id} className={styles.thumbnailWrapper}>
            <Image
              src={image.original}
              alt=""
              fill
              className={styles.thumbnailImage}
              sizes="140px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
