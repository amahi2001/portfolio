import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Image, { StaticImageData } from "next/image";
import NYPL from "@assets/nyplico-modified.png";
import Nasa from "@assets/NASA.png";

const LinkImage = ({ src, alt }: { src: StaticImageData; alt: string }) => (
  <Image
    className="img-fluid rounded-circle me-2"
    priority
    style={{ maxWidth: "50px", maxHeight: "50px" }}
    {...{ src, alt }}
  />
);

export default function Jobs(): JSX.Element {
  return (
    <Row className="mb-4 justify-content-center">
      <Col sm={8}>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="work-content">
            <Accordion.Header>
              <LinkImage src={NYPL} alt="NYPL logo" /> NYPL
              <span className="ms-auto">Aug 2022 - Present</span>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1" className="work-content">
            <Accordion.Header>
              <LinkImage src={Nasa} alt="NASA logo" /> NASA
              <span className="ms-auto">Jun 2022 - Aug 2022</span>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className="work-content">
            <Accordion.Header>
              <LinkImage src={NYPL} alt="NYPL logo" /> NYPL
              <span className="ms-auto">Aug 2021 - Jun 2022</span>
            </Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}
