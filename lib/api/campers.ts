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

interface GetCampersParams {
  page: number;
  perPage: number;
  location?: string;
  form?: CamperForm;
  transmission?: Transmission;
  engine?: Engine;
}

export async function getCampers({
  page,
  perPage,
  location,
  form,
  transmission,
  engine,
}: GetCampersParams): Promise<CampersResponse> {
  const searchParams = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
    ...(location && { location }),
    ...(form && { form }),
    ...(transmission && { transmission }),
    ...(engine && { engine }),
  });

  const url = `${API_URL}/campers?${searchParams.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch campers");
  }

  const data: CampersResponse = await response.json();

  return data;
}

export async function getCamper(camperId: string): Promise<Camper> {
  const url = `${API_URL}/campers/${camperId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch camper: ${response.status} ${response.statusText}`,
    );
  }

  const data: Camper = await response.json();

  return data;
}

export async function getCamperReviews(
  camperId: string,
): Promise<CamperReview[]> {
  const response = await fetch(`${API_URL}/campers/${camperId}/reviews`);

  if (!response.ok) {
    throw new Error("Failed to fetch camper reviews");
  }

  const data: CamperReview[] = await response.json();

  return data;
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

  const data: BookingResponse = await response.json();

  return data;
}
