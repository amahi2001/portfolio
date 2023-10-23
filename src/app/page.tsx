"use client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Collapse from "react-bootstrap/Collapse";
import Fade from "react-bootstrap/Fade";
import Container from "react-bootstrap/Container";
import { Image } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import { use, useRef, useState } from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { useMediaQuery } from "react-responsive";

const images = {
  headshot: "headshot.jpeg",
  space: "stars.jpeg",
  stars: "stars.jpg",
};

const links = {
  linkedIn: "https://www.linkedin.com/in/abrarmahi/",
  github: "https://github.com/amahi2001",
};

export default function Home() {
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const parallax = useRef<IParallax>(null!);
  //shows animated text below the headshot
  const [showAnimatedText, setShowAnimatedText] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  return (
    <div>
      <Parallax pages={2} ref={parallax}>
        {/* space background */}
        <ParallaxLayer
          offset={0}
          speed={0}
          factor={2}
          style={{
            backgroundImage: `url(${images.stars})`,
            backgroundSize: "cover",
          }}
        />

        {/* LinkedIn and Github links at top */}
        <Navbar
          sticky="top"
          bg="transparent"
          variant="dark"
          className=" justify-content-end"
        >
          <Navbar.Brand target="_blank" href={links.github}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Navbar.Brand>
          <Navbar.Brand target="_blank" href={links.linkedIn}>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </Navbar.Brand>
        </Navbar>

        {/* First Page, HeadShot + type animation */}
        <ParallaxLayer
          onClick={() => parallax.current.scrollTo(1)}
          speed={0.5}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            {...(isMobile &&
              showDesc && {
                style: {
                  paddingTop: "65vh",
                },
              })}
          >
            {/* Name and Greeting */}
            <Row>
              <Col className="text-center">
                <TypeAnimation
                  cursor={false}
                  sequence={[
                    "Hi I'm Abrar Mahi 👋",
                    () => {
                      setTimeout(() => setShowAnimatedText(true), 1000);
                    },
                  ]}
                  wrapper="h1"
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

            <Fade in={showAnimatedText} mountOnEnter>
              <Row>
                <Col className="text-center">
                  <TypeAnimation
                    sequence={[
                      "I build software for the web",
                      1000,
                      "I build software for mobile",
                      1000,
                      "I build software.",
                      () => {
                        setTimeout(() => setShowDesc(true), 1000);
                      },
                    ]}
                    wrapper="h2"
                    speed={20}
                    deletionSpeed={20}
                    style={{
                      fontSize: "2em",
                      display: "inline-block",
                      color: "white",
                    }}
                    // repeat={Infinity}
                  />
                </Col>
              </Row>
            </Fade>
            <Collapse in={showDesc}>
              <Row className="mt-4">
                <Col className="text-center">
                  <p className="lead">
                    I have always been fascinated by the intersection of math
                    and technology, and look to apply what I learn in school to
                    real-world situations. In my free time, you will find me
                    working on some cool computer problems, volunteering, or
                    learning new concepts in finance and tech. My passion for
                    STEM drives me to continually expand my knowledge and make a
                    difference in the lives of others.
                  </p>
                </Col>
              </Row>
            </Collapse>
            <Collapse in={showDesc}>
              <Row className="mt-4">
                <Col className="text-center">
                  <Button
                    aria-label="scroll down"
                    variant="link"
                    className="text-light"
                    onClick={() => parallax.current.scrollTo(1)}
                  >
                    Scroll down to learn more
                  </Button>
                </Col>
              </Row>
            </Collapse>
          </Container>
        </ParallaxLayer>
        {/* Second Layer */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          onClick={() => parallax.current.scrollTo(0)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Test 1",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "Test 2",
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
    </div>
  );
}
