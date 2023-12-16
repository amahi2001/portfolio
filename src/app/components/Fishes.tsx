import Image from "next/image";
import fishLeft from "@assets/fish-left.png";
import fishRight from "@assets/fish-right.png";
import shark from "@assets/shark.png";
import { ParallaxLayer } from "@react-spring/parallax";
import { Fragment } from "react";

export default function Fishes() {
  return (
    <Fragment>
      <ParallaxLayer className="fish-layer-left" offset={1.3} speed={-0.2}>
        <Image className="fish-left" src={fishLeft} alt="fish" />
      </ParallaxLayer>
      <ParallaxLayer className="fish-layer-right" offset={2.3} speed={-0.3}>
        <Image className="fish-right" src={fishRight} alt="fish" />
      </ParallaxLayer>
      <ParallaxLayer className="shark-layer" offset={1.5} speed={-0.4}>
        <Image className="shark" src={shark} alt="shark" />
      </ParallaxLayer>
    </Fragment>
  );
}
