import type { Metadata } from "next";

import Home from "@/components/Home/Home";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Find and rent the campervan of your dreams with TravelTrucks.",
};

export default function Page() {
  return <Home />;
}
