"use client";
//react-bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { default as BSFade } from "react-bootstrap/Fade";
import Container from "react-bootstrap/Container";
// other component libraries
import { TypeAnimation } from "react-type-animation";
import { Fade } from "react-awesome-reveal";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//hooks
import { useMediaQuery } from "react-responsive";
import useStorage from "@/hooks/useStorage";
//images
import headshot from "@assets/headshot.jpeg";
//components
import Fishes from "@/app/components/Fishes";
import Jobs from "@/app/components/Jobs";
import dynamic from "next/dynamic";

import { BriefIntro, MoreAboutMe } from "@/app/components/Content";
//react & next
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

const links = {
  linkedIn: "https://www.linkedin.com/in/abrarmahi/",
  github: "https://github.com/amahi2001",
};

const Cursor = dynamic(
  () => import("@/app/components/Cursor"),
  { ssr: false } // This will load the component client side only
);

export default function Home() {
  const { getItem, setItem } = useStorage();
  const production = process.env.NODE_ENV === "production";
  // const production = true; //TODO: remove this for production
  // max width of 800px and height of 600px
  const isMobile = useMediaQuery({ query: "(max-width: 800px)" });
  const parallax = useRef<IParallax>(null!);
  //shows animated text below the headshot
  const [showAnimatedText, setShowAnimatedText] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {
    //check if the description has been loaded before
    const descLoaded = getItem("desc_loaded");
    if (descLoaded) {
      setShowAnimatedText(true);
      setShowDesc(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <Parallax pages={3} ref={parallax} enabled={production ? showDesc : true}>
        {/* background layer */}
        <ParallaxLayer
          className="parallax-bg"
          offset={0}
          speed={0}
          factor={3}
        />

        {/* Navbar */}
        <Navbar
          expand="lg"
          sticky="top"
          variant="dark"
          className="semi-transparent"
        >
          {/* toggle for mobile view */}
          {/* //Todo : display this after done for production */}
          <BSFade in={showDesc && !production}>
            <Navbar.Toggle
              aria-controls="offcanvasNavbar-expand-lg"
              className="me-auto"
              disabled={!showDesc}
            />
          </BSFade>

          {/* navbar menu, offcanvas in mobile/tablet view */}
          {/* //Todo : display this after done for production */}
          {!production && (
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-lg"
              aria-labelledby="offcanvasNavbarLabel-expand-lg"
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-lg">
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="me-auto">
                <BSFade in={production ? showDesc : true}>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown
                      title="Dropdown"
                      id="offcanvasNavbarDropdown-expand-lg"
                    >
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </BSFade>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          )}

          {/* //todo: remove this for production */}
          <Col xs={6} className="ms-auto text-wrap">
            <p className="construction my-auto">🚧 Under Construction 🚧</p>
          </Col>

          {/* github and linkedin icons */}
          <Navbar.Brand target="_blank" href={links.github}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </Navbar.Brand>
          <Navbar.Brand target="_blank" href={links.linkedIn}>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </Navbar.Brand>
        </Navbar>

        {/* Fishes */}
        <Fishes />
        {/* First Page, HeadShot + type animation */}
        <ParallaxLayer
          onClick={() => showDesc && parallax.current.scrollTo(1)}
          speed={0.5}
          style={{
            display: "flex",
            alignItems: isMobile ? "auto" : "center",
            justifyContent: "center",
          }}
        >
          <Container
            style={{
              height: "100dvh",
            }}
          >
            {/* Name and Greeting */}
            <Fade cascade>
              <Row className="name-row text-center">
                <Col>
                  <TypeAnimation
                    cursor={false}
                    sequence={[
                      "Hi I'm Abrar Mahi 👋🏾",
                      1000,
                      () => setShowAnimatedText(true),
                    ]}
                    wrapper="h1"
                    speed={40}
                    preRenderFirstString={showAnimatedText}
                  />
                </Col>
              </Row>

              <Row className="my-4">
                <Col className="text-center m-auto">
                  <Image
                    className="img-fluid rounded-circle"
                    src={headshot}
                    priority
                    alt="Abrar's headshot"
                    style={{ maxWidth: "30%", maxHeight: "30%" }}
                  />
                </Col>
              </Row>
              <BSFade in={showAnimatedText} mountOnEnter>
                <Row>
                  <Col className="text-center">
                    <TypeAnimation
                      sequence={[
                        "I transform complex problems into elegant software",
                        2500,
                        "I build smarter, faster, and more intuitive systems.",
                        2500,
                        "I turn coffee into code ☕.",
                        2500,
                        () => {
                          setShowDesc(true);
                          setItem("desc_loaded", "true");
                        },
                      ]}
                      wrapper="h2"
                      speed={45}
                      deletionSpeed={90}
                      style={{
                        fontSize: "1.5em",
                        fontWeight: "300",
                        display: "inline-block",
                      }}
                    />
                  </Col>
                </Row>
              </BSFade>
              <BriefIntro
                in={production ? showDesc : true}
                onEntering={() => parallax.current.scrollTo(0.1)}
              />
              <BSFade in={showDesc}>
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
              </BSFade>
            </Fade>
          </Container>
        </ParallaxLayer>
        {/* Second Layer */}
        <ParallaxLayer
          offset={1}
          speed={0.5}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
            style={{
              height: "100dvh",
            }}
          >
            <Fade>
              <Row className="mb-4">
                <Col className="text-center">
                  <h2>Professional Summary</h2>
                </Col>
              </Row>
            </Fade>

            <MoreAboutMe />
          </Container>
        </ParallaxLayer>
        {/* Third Layer */}
        <ParallaxLayer
          offset={2}
          speed={0.5}
          // onClick={() => parallax.current.scrollTo(0)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container
          // style={{
          //   height: "100dvh",
          // }}
          >
            <Fade cascade>
              <Row className="mb-4">
                <Col className="text-center">
                  <h2>Where I&apos;ve worked</h2>
                </Col>
              </Row>

              <Jobs />
            </Fade>
          </Container>
        </ParallaxLayer>
      </Parallax>
      <Cursor show={production && !isMobile} />
    </main>
  );
}
