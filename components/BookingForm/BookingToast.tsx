import styles from "./BookingForm.module.css";

interface BookingToastProps {
  title: string;
  message: string;
}

export default function BookingToast({ title, message }: BookingToastProps) {
  return (
    <div className={styles.successToast} role="status">
      <span className={styles.successIcon}>✓</span>

      <div>
        <p className={styles.successTitle}>{title}</p>

        <p className={styles.successText}>{message}</p>
      </div>
    </div>
  );
}
