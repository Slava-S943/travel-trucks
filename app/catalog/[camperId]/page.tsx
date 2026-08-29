import type { Metadata } from "next";

import { getCamper } from "@/lib/api/campers";
import CamperDetails from "@/components/CamperDetails/CamperDetails";

interface CamperDetailsPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export async function generateMetadata({
  params,
}: CamperDetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await getCamper(camperId);

    return {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
    };
  } catch {
    return {
      title: "Camper details | TravelTrucks",
      description: "View camper details, reviews and booking information.",
    };
  }
}

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  return <CamperDetails camperId={camperId} />;
}
