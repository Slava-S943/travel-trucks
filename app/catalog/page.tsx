import type { Metadata } from "next";

import Catalog from "@/components/Catalog/Catalog";

export const metadata: Metadata = {
  title: "Catalog | TravelTrucks",
  description: "Browse and filter available campervans with TravelTrucks.",
};

export default function Page() {
  return <Catalog />;
}
