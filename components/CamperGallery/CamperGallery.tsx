"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { CamperGalleryItem } from "@/types/camper";
import styles from "./CamperGallery.module.css";

interface CamperGalleryProps {
  gallery: CamperGalleryItem[];
}

export default function CamperGallery({ gallery }: CamperGalleryProps) {
  return (
    <Swiper className={styles.gallery} spaceBetween={16} slidesPerView={1}>
      {gallery.map((image) => (
        <SwiperSlide key={image.id}>
          <div className={styles.imageWrapper}>
            <Image
              src={image.original}
              alt="Camper"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
