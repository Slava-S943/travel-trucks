import Image from "next/image";

import styles from "./Catalog.module.css";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIllustration}>
        <Image
          src="/images/empty-campers.png"
          alt=""
          width={488}
          height={463}
          className={styles.emptyImage}
          aria-hidden="true"
        />
      </div>

      <h2 className={styles.emptyTitle}>No campers found</h2>

      <div className={styles.emptyDescription}>
        <p>We couldn`t find any campers that match your filters.</p>

        <p>Try adjusting your search or clearing some filters.</p>
      </div>

      <div className={styles.emptyActions}>
        <button
          type="button"
          className={styles.emptyClearButton}
          onClick={onClear}
        >
          <Image
            src="/icons/close.svg"
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
          />
          Clear filters
        </button>

        <button
          type="button"
          className={styles.viewAllButton}
          onClick={onClear}
        >
          View all campers
        </button>
      </div>
    </div>
  );
}
