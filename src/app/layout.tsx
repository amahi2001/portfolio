import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
const ubuntu = Ubuntu({ weight: ['300', '400', '500'],  subsets: ["latin"] });

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
      <body className={`text-light ${ubuntu.className}`}>
        {children}
      </body>
    </html>
  );
}
