import "./override.scss";
import type { Metadata } from "next";
import { Nunito, Ubuntu } from "next/font/google";
const nunito = Nunito({ weight: ['300', '400', '500', "700"],  subsets: ["latin"] });

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
      <body className={`text-light ${nunito.className}`}>
        {children}
      </body>
    </html>
  );
}
