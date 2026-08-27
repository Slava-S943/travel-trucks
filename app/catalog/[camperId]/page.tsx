import CamperDetails from "@/components/CamperDetails/CamperDetails";

interface CamperDetailsPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;

  return <CamperDetails camperId={camperId} />;
}
