import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Fade } from "react-awesome-reveal";
import { Fragment } from "react";

export function BriefIntro(): JSX.Element {
  return (
    <Row className="mt-4 justify-content-center">
      <Col md={8} className="text-left border-start">
        <p className="lead">
          As a full-stack engineer with a keen eye for the cutting edge, I pride
          myself on being a jack of all trades in the tech world. Armed with a
          diverse skill set from C++ to Python, and JavaScript to Dart,
          I&apos;ve crafted responsive interfaces and robust back-ends using
          frameworks like <b>Django, React, and Flutter</b>.
        </p>
        <p className="lead">
          At the heart of my approach is a relentless pursuit of the newest
          technologies and best practices, ensuring that every line of code not
          only solves a problem but also pushes the envelope of what&apos;s
          possible.
        </p>
        <p className="lead">
          My tenure at <b>The New York Public Library</b> and Internship at{" "}
          <b>NASA</b> underscore my adaptability and dedication. Whether
          it&apos;s implementing CI/CD pipelines or enhancing satellite data
          frameworks, my experience is a testament to my capability to not just
          navigate but excel in the ever-evolving landscape of software
          development.
        </p>
      </Col>
    </Row>
  );
}

export function MoreAboutMe(): JSX.Element {
  return (
    <Fragment>
      <Fade cascade>
        <p className="lead">
          👶🏽 As a child, I was the kid who dismantled toys to marvel at their
          circuits—my first foray into a lifelong fascination with technology.
        </p>
        <p className="lead">
          🧑🏾 By my teens, I was assembling PCs from cast-off parts and scripting
          in Python, laying the groundwork for a future in software development.
          That future took shape after a pivotal summer at NYU Tandon&apos;s
          STEM program, where robotics turned my code into kinetic energy and
          set my course.
        </p>
        <p className="lead">
          👨🏾‍💻 Today, I&apos;m immersed in building and leading projects that
          leverage React, Python and Google Cloud and beyond, turning complex
          challenges into elegant solutions. My professional journey has been a
          rich tapestry of experiences, from developing Python frameworks for
          NASA to engineering full-stack solutions for The New York Public
          Library. Each role has honed my ability to not just write code, but to
          solve problems and lead projects that make a tangible impact.
        </p>
        <p className="lead">
          👨🏾‍🔬 Away from the screen, I&apos;m an explorer at heart, whether
          it&apos;s contributing to tech forums, immersing myself in the worlds
          of soccer and martial arts, or simply enjoying the quest for knowledge
          in the evolving landscape of technology.
        </p>
      </Fade>
    </Fragment>
  );
}
