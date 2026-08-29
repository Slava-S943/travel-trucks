"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getCamperReviews } from "@/lib/api/campers";
import styles from "./CamperReviews.module.css";

interface CamperReviewsProps {
  camperId: string;
}

export default function CamperReviews({ camperId }: CamperReviewsProps) {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["camper-reviews", camperId],
    queryFn: () => getCamperReviews(camperId),
  });

  if (isLoading) {
    return <p className={styles.message}>Loading reviews...</p>;
  }

  if (isError) {
    return (
      <p className={styles.message}>
        {error instanceof Error ? error.message : "Something went wrong."}
      </p>
    );
  }

  if (!reviews || reviews.length === 0) {
    return <p className={styles.message}>No reviews yet.</p>;
  }

  return (
    <section className={styles.reviews}>
      <h2 className={styles.title}>Reviews</h2>

      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <article key={review.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <div className={styles.reviewAvatar}>
                {review.reviewer_name.charAt(0)}
              </div>

              <div className={styles.reviewerInfo}>
                <h3 className={styles.reviewerName}>{review.reviewer_name}</h3>

                <div
                  className={styles.rating}
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
        ))}
      </div>
    </section>
  );
}
