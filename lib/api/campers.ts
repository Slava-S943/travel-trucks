import type {
  CamperForm,
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
