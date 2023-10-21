"use client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { useRef, useState } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { TypeAnimation } from "react-type-animation";

const images = {
  headshot: "headshot.jpeg",
  space: "stars.jpeg",
};

export default function Home() {
  const parallax = useRef<IParallax>(null!);
  const [showSecond, setShowSecond] = useState(false);
  return (
    <Parallax pages={2} ref={parallax}>
      {/* space background */}
      <ParallaxLayer
        offset={0}
        speed={0}
        factor={2}
        style={{
          backgroundImage: `url(${images.space})`,
          backgroundSize: "cover",
        }}
      />
      {/* First Page, HeadShot + type animation */}
      <ParallaxLayer
        speed={0.5}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
            <Col className="text-center">
              <TypeAnimation
                cursor={false}
                sequence={[
                  "Hi I'm Abrar 👋",
                  () => {
                    setTimeout(() => setShowSecond(true), 1000);
                  },
                ]}
                wrapper="h1"
                className="display-6"
                speed={20}
                style={{
                  fontSize: "2em",
                  display: "inline-block",
                  color: "white",
                }}
                // repeat={Infinity}
              />
            </Col>
          </Row>
          <Row className="my-4">
            <Col className="text-center m-auto">
              <Image
                alt="Abrar's headshot"
                src={images.headshot}
                roundedCircle
                fluid
                style={{ maxWidth: "30%", maxHeight: "30%" }}
              />
            </Col>
          </Row>

          <Row>
            <Col className="text-center">
              {showSecond && (
                <TypeAnimation
                  sequence={[
                    "I am a Software Engineer",
                    1000,
                    "I build web apps",
                    1000,
                    "I build mobile apps",
                    1000,
                  ]}
                  wrapper="h2"
                  className="display-6"
                  speed={20}
                  style={{
                    fontSize: "2em",
                    display: "inline-block",
                    color: "white",
                  }}
                  // repeat={Infinity}
                />
              )}
            </Col>
          </Row>

          <Row className="mt-4">
            <Col className="text-center">
              <Button
                aria-label="scroll down"
                variant="link"
                className="text-light opacity-75"
                onClick={() => parallax.current?.scrollTo(1)}
              >
                &or;
              </Button>
            </Col>
          </Row>
        </Container>
      </ParallaxLayer>
      {/* Second Layer */}
      <ParallaxLayer offset={1}>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "We produce food for Mice",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "We produce food for Hamsters",
            1000,
            "We produce food for Guinea Pigs",
            1000,
            "We produce food for Chinchillas",
            1000,
          ]}
          wrapper="span"
          speed={1}
          style={{
            fontSize: "2em",
            display: "inline-block",
            color: "white",
          }}
          repeat={Infinity}
        />
      </ParallaxLayer>
    </Parallax>
  );
}
