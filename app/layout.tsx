import type { Metadata } from "next";
import QueryProvider from "@/components/providers/QueryProvider";
import Header from "@/components/Header/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "TravelTrucks - camper rental service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
