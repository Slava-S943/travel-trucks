import type {
  BookingRequest,
  BookingResponse,
  Camper,
  CamperForm,
  CamperReview,
  CampersResponse,
  Engine,
  Transmission,
} from "@/types/camper";

const API_URL = "https://campers-api.goit.study";

export interface GetCampersParams {
  page: number;
  perPage: number;
  location?: string;
  form?: CamperForm;
  transmission?: Transmission;
  engine?: Engine;
  tv?: boolean;
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
}

export async function getCampers({
  page,
  perPage,
  location,
  form,
  transmission,
  engine,
  tv,
  AC,
  kitchen,
  bathroom,
}: GetCampersParams): Promise<CampersResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  if (location) {
    searchParams.set("location", location);
  }

  if (form) {
    searchParams.set("form", form);
  }

  if (transmission) {
    searchParams.set("transmission", transmission);
  }

  if (engine) {
    searchParams.set("engine", engine);
  }

  if (tv) {
    searchParams.set("tv", "true");
  }

  if (AC) {
    searchParams.set("AC", "true");
  }

  if (kitchen) {
    searchParams.set("kitchen", "true");
  }

  if (bathroom) {
    searchParams.set("bathroom", "true");
  }

  const response = await fetch(`${API_URL}/campers?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch campers");
  }

  return response.json();
}

export async function getCamper(camperId: string): Promise<Camper> {
  const response = await fetch(`${API_URL}/campers/${camperId}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch camper: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function getCamperReviews(
  camperId: string,
): Promise<CamperReview[]> {
  const response = await fetch(`${API_URL}/campers/${camperId}/reviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch camper reviews");
  }

  return response.json();
}

export async function createBookingRequest(
  camperId: string,
  bookingData: BookingRequest,
): Promise<BookingResponse> {
  const response = await fetch(
    `${API_URL}/campers/${camperId}/booking-requests`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(bookingData),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to create booking request");
  }

  return response.json();
}
