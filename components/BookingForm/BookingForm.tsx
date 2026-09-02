"use client";

import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { createBookingRequest } from "@/lib/api/campers";
import type { BookingRequest } from "@/types/camper";

import BookingFields from "./BookingFields";
import BookingToast from "./BookingToast";
import { validateEmail, validateName } from "./validation";

import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

interface FormErrors {
  name?: string;
  email?: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [form, setForm] = useState<BookingRequest>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const mutation = useMutation({
    mutationFn: (bookingData: BookingRequest) =>
      createBookingRequest(camperId, bookingData),
    onSuccess: () => {
      setForm({
        name: "",
        email: "",
      });
      setErrors({});
      setShowSuccessToast(true);
    },
  });

  useEffect(() => {
    if (!showSuccessToast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [showSuccessToast]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (name === "name") {
      setErrors((currentErrors) => ({
        ...currentErrors,
        name: undefined,
      }));
    }

    if (name === "email") {
      setErrors((currentErrors) => ({
        ...currentErrors,
        email: undefined,
      }));
    }

    if (mutation.isError) {
      mutation.reset();
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "name" && value.trim()) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        name: validateName(value),
      }));
    }

    if (name === "email" && value.trim()) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        email: validateEmail(value),
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();

    const nameError = validateName(name);
    const emailError = validateEmail(email);

    const nextErrors: FormErrors = {
      ...(nameError && { name: nameError }),
      ...(emailError && { email: emailError }),
    };

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    mutation.mutate({
      name,
      email,
    });
  };

  const hasErrors = Boolean(errors.name || errors.email);

  return (
    <>
      <section
        className={`${styles.booking} ${hasErrors ? styles.bookingError : ""}`}
      >
        <div className={styles.content}>
          <h2 className={styles.title}>Book your campervan now</h2>

          <p className={styles.subtitle}>
            Stay connected! We are always ready to help you.
          </p>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <BookingFields
              name={form.name}
              email={form.email}
              nameError={errors.name}
              emailError={errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button
              className={styles.button}
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Sending..." : "Send"}
            </button>
          </form>

          {mutation.isError && (
            <p className={styles.error}>
              {mutation.error instanceof Error
                ? mutation.error.message
                : "Something went wrong."}
            </p>
          )}
        </div>
      </section>

      {showSuccessToast && (
        <BookingToast
          title="Booking successful"
          message="Your booking request has been sent successfully."
        />
      )}
    </>
  );
}
