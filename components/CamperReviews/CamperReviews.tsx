"use client";

import { useQuery } from "@tanstack/react-query";

import { getCamperReviews } from "@/lib/api/campers";

import ReviewCard from "./ReviewCard";

import Loader from "@/components/Loader/Loader";
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
    return <Loader />;
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

      <ul className={styles.reviewsList}>
        {reviews.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}
