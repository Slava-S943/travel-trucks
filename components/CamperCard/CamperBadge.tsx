import Image from "next/image";

import styles from "./CamperCard.module.css";

interface CamperBadgeProps {
  icon: string;
  label: string;
}

export default function CamperBadge({ icon, label }: CamperBadgeProps) {
  return (
    <span className={styles.badge}>
      <Image
        src={icon}
        alt=""
        width={20}
        height={20}
        className={styles.badgeIcon}
        aria-hidden="true"
      />

      <span className={styles.badgeLabel}>{label}</span>
    </span>
  );
}
