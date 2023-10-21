import "bootstrap/dist/css/bootstrap.min.css";
import "./global.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import AnimatedCursor from "react-animated-cursor";
const ubuntu = Ubuntu({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Welcome to my portfolio",
  description: "Generated by create next app",
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
          outerSize={8}
          color="193, 11, 111"
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
      </body>
    </html>
  );
}
