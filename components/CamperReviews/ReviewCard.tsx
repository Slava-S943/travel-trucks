import Image from "next/image";

import type { CamperReview } from "@/types/camper";

import styles from "./CamperReviews.module.css";

interface ReviewCardProps {
  review: CamperReview;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className={styles.review}>
      <div className={styles.reviewHeader}>
        <div className={styles.reviewAvatar}>
          {review.reviewer_name.charAt(0)}
        </div>

        <div className={styles.reviewerInfo}>
          <h3 className={styles.reviewerName}>{review.reviewer_name}</h3>

          <div
            className={styles.rating}
            role="img"
            aria-label={`Rating: ${review.reviewer_rating} out of 5`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Image
                key={index}
                src={
                  index < review.reviewer_rating
                    ? "/icons/star.svg"
                    : "/icons/star-empty.svg"
                }
                alt=""
                width={16}
                height={16}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <p className={styles.comment}>{review.comment}</p>
    </article>
  );
}
