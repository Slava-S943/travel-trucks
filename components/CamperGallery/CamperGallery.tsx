"use client";

import Image from "next/image";
import { useState } from "react";

import type { CamperGalleryItem } from "@/types/camper";

import styles from "./CamperGallery.module.css";

interface CamperGalleryProps {
  gallery: CamperGalleryItem[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<CamperGalleryItem | null>(
    gallery[0] ?? null,
  );

  if (!selectedImage) {
    return null;
  }

  const thumbnails = gallery.slice(0, 4);

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageWrapper}>
        <Image
          src={selectedImage.original}
          alt="Camper"
          fill
          className={styles.mainImage}
          sizes="(max-width: 1199px) 100vw, 638px"
          loading="eager"
        />
      </div>

      <div className={styles.thumbnails}>
        {thumbnails.map((image) => {
          const isSelected = image.id === selectedImage.id;

          return (
            <button
              key={image.id}
              type="button"
              className={`${styles.thumbnailWrapper} ${
                isSelected ? styles.thumbnailActive : ""
              }`}
              onClick={() => setSelectedImage(image)}
              aria-label={`Show image ${image.order + 1}`}
              aria-pressed={isSelected}
            >
              <Image
                src={image.original}
                alt=""
                fill
                className={styles.thumbnailImage}
                sizes="(max-width: 765px) 50vw, 135px"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
