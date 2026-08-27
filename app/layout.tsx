import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";
import Header from "@/components/Header/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-family",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--second-family",
  subsets: ["latin"],
  display: "swap",
});

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
      <body className={`${inter.variable} ${manrope.variable}`}>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
