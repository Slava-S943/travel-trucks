"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createBookingRequest } from "@/lib/api/campers";
import type { BookingRequest } from "@/types/camper";
import styles from "./BookingForm.module.css";

interface BookingFormProps {
  camperId: string;
}

export default function BookingForm({ camperId }: BookingFormProps) {
  const [form, setForm] = useState<BookingRequest>({
    name: "",
    email: "",
  });

  const mutation = useMutation({
    mutationFn: (bookingData: BookingRequest) =>
      createBookingRequest(camperId, bookingData),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    mutation.mutate(form);
  };

  return (
    <section className={styles.booking}>
      <h2 className={styles.title}>Book your camper</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className={styles.button}
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Sending..." : "Book now"}
        </button>
      </form>

      {mutation.isSuccess && mutation.data && (
        <p className={styles.success}>{mutation.data.message}</p>
      )}

      {mutation.isError && (
        <p className={styles.error}>
          {mutation.error instanceof Error
            ? mutation.error.message
            : "Something went wrong."}
        </p>
      )}
    </section>
  );
}
