"use client";
// import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Image } from "react-bootstrap";
import { useRef } from "react";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { TypeAnimation } from "react-type-animation";

const images = {
  headshot: "headshot.jpeg",
  space: "stars.jpeg",
  space2:
    "https://images.unsplash.com/photo-1509515837298-2c67a3933321?auto=format&fit=crop&q=80&w=3088&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

export default function Home() {
  const parallax = useRef<IParallax>(null!);
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
        // offset={0.2}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
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
          <Row className="mt-4">
            <Col className="text-center">
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Hi I'm Abrar 👋",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "I am a Software Engineer",
                  1000,
                  "I build web apps",
                  1000,
                  "I build mobile apps",
                  1000,
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
          <Row className="mt-4">
            <Col className="text-center">
              <Button
                variant="link"
                className="text-light"
                onClick={() => parallax.current?.scrollTo(1)}
                style={{
                  opacity: "50%",
                }}
              >
                Scroll down
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
