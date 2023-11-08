"use client";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Collapse from "react-bootstrap/Collapse";
import Fade from "react-bootstrap/Fade";
import Container from "react-bootstrap/Container";
import AnimatedCursor from "react-animated-cursor";
import { Image } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import { useRef, useState, Fragment } from "react";
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
  const production = process.env.NODE_ENV === "production";
  // max width of 800px and height of 600px
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
          <Container>
            {/* Name and Greeting */}
            <Row
              style={{
                marginTop: isMobile ? "30%" : 0,
              }}
            >
              <Col className="text-center">
                <TypeAnimation
                  cursor={false}
                  sequence={[
                    "Hi I'm Abrar Mahi 👋🏾",
                    1000,
                    () => setShowAnimatedText(true),
                  ]}
                  wrapper="h1"
                  speed={40}
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "300",
                    display: "inline-block",
                  }}
                  repeat={1}
                  preRenderFirstString={showAnimatedText}
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
                      "I transform complex problems into elegant software",
                      2500,
                      "I build smarter, faster, and more intuitive systems.",
                      2500,
                      "I turn coffee into code ☕.",
                      2500,
                      () => setShowDesc(true),
                    ]}
                    wrapper="h2"
                    speed={45}
                    deletionSpeed={75}
                    // preRenderFirstString
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "300",
                      display: "inline-block",
                    }}
                    // repeat={Infinity}
                  />
                </Col>
              </Row>
            </Fade>
            <Fade
              in={production ? showDesc : true}
              onEntering={() => parallax.current.scrollTo(0.1)}
            >
              <Row className="mt-4 justify-content-center">
                <Col md={8} className="text-left">
                  <p className="lead">
                    As a full-stack engineer with a keen eye for the cutting
                    edge, I pride myself on being a jack of all trades in the
                    tech world. Armed with a diverse skill set from C++ to
                    Python, and JavaScript to Dart, I&apos;ve crafted responsive
                    interfaces and robust back-ends using frameworks like{" "}
                    <b>Django, React, and Flutter</b>.
                  </p>
                  <p className="lead">
                    At the heart of my approach is a relentless pursuit of the
                    newest technologies and best practices, ensuring that every
                    line of code not only solves a problem but also pushes the
                    envelope of what&apos;s possible.
                  </p>
                  <p className="lead">
                    My tenure at The New York Public Library and an Algorithms
                    Development Internship at NASA underscore my adaptability
                    and dedication. Whether it&apos;s implementing CI/CD
                    pipelines or enhancing satellite data frameworks, my
                    experience is a testament to my capability to not just
                    navigate but excel in the ever-evolving landscape of
                    software development.
                  </p>
                </Col>
              </Row>
            </Fade>
            <Fade in={showDesc}>
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
            </Fade>
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
          <Container>
            <Row>
              <Col>
                <p className="lead" id="prof_sum">
                  👶🏽 As a child, I was the kid who dismantled toys to marvel at
                  their circuits—my first foray into a lifelong fascination with
                  technology.
                  <br />
                  <br />
                  🧑🏾 By my teens, I was assembling PCs from cast-off parts and
                  scripting in Python, laying the groundwork for a future in
                  software development. That future took shape after a pivotal
                  summer at NYU Tandon&apos;s STEM program, where robotics
                  turned my code into kinetic energy and set my course.
                  <br />
                  <br />
                  👨🏾‍💻 Today, I&apos;m immersed in building and leading projects
                  that leverage React, Python and Google Cloud and beyond,
                  turning complex challenges into elegant solutions. My
                  professional journey has been a rich tapestry of experiences,
                  from developing Python frameworks for NASA to engineering
                  full-stack solutions for The New York Public Library. Each
                  role has honed my ability to not just write code, but to solve
                  problems and lead projects that make a tangible impact.
                  <br />
                  <br />
                  👨🏾‍🔬 Away from the screen, I&apos;m an explorer at heart,
                  whether it&apos;s contributing to tech forums, immerse myself
                  in the worlds of soccer and martial arts, or simply enjoying
                  the quest for knowledge in the evolving landscape of
                  technology.
                </p>
              </Col>
            </Row>
          </Container>
        </ParallaxLayer>
      </Parallax>
      {production && !isMobile && (
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
      )}
    </div>
  );
}
