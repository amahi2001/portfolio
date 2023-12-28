"use client";
import AnimatedCursor from "react-animated-cursor";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Cursor({ show }: { show: boolean }): React.ReactNode {
  if (show) {
    return (
      <>
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
            border: "2px solid var(--cursor-color)",
          }}
        />
        <SpeedInsights />
      </>
    );
  }
  return null;
}
