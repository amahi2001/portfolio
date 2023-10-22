import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import AnimatedCursor from "react-animated-cursor";
const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

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
      <body className={ubuntu.className}>
        {children}
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          // hasBlendMode={true}
          innerStyle={{
            backgroundColor: "var(--cursor-color)",
          }}
          outerStyle={{
            border: "3px solid var(--cursor-color)",
          }}
        />
      </body>
    </html>
  );
}
