import Image from "next/image";

import styles from "./BookingForm.module.css";

interface BookingFieldsProps {
  name: string;
  email: string;
  nameError?: string;
  emailError?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export default function BookingFields({
  name,
  email,
  nameError,
  emailError,
  onChange,
  onBlur,
}: BookingFieldsProps) {
  return (
    <>
      <div className={`${styles.field} ${nameError ? styles.fieldError : ""}`}>
        <label className={styles.label} htmlFor="booking-name">
          Name*
        </label>

        <input
          id="booking-name"
          className={styles.input}
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(nameError)}
          aria-describedby={nameError ? "booking-name-error" : undefined}
          placeholder={!nameError ? "Name*" : ""}
        />

        {nameError && (
          <Image
            src="/icons/error.svg"
            alt=""
            width={20}
            height={20}
            className={styles.errorIcon}
            aria-hidden="true"
          />
        )}

        {nameError && (
          <p id="booking-name-error" className={styles.errorMessage}>
            {nameError}
          </p>
        )}
      </div>

      <div className={`${styles.field} ${emailError ? styles.fieldError : ""}`}>
        <label className={styles.label} htmlFor="booking-email">
          Email*
        </label>

        <input
          id="booking-email"
          className={styles.input}
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={Boolean(emailError)}
          aria-describedby={emailError ? "booking-email-error" : undefined}
          placeholder={!emailError ? "Email*" : ""}
        />

        {emailError && (
          <Image
            src="/icons/error.svg"
            alt=""
            width={20}
            height={20}
            className={styles.errorIcon}
            aria-hidden="true"
          />
        )}

        {emailError && (
          <p id="booking-email-error" className={styles.errorMessage}>
            {emailError}
          </p>
        )}
      </div>
    </>
  );
}
