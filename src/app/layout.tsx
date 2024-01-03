import "./global.scss";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const nunito = Nunito({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Welcome to my portfolio",
  description: "Abrar Mahi's portfolio website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`text-light ${nunito.className}`}>{children}</body>
      <Analytics />
    </html>
  );
}
