import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
import NYPL from "@assets/nyplico-modified.png";
import Nasa from "@assets/NASA.png";

export default function Jobs(): JSX.Element {
  return (
    <Row className="mb-4 justify-content-center">
      <Col md={8}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav className="flex-column glass-morph border-start" defaultActiveKey="first" justify>
                <Nav.Item>
                  <Nav.Link className="work-link" eventKey="first">
                    <Image
                      className="img-fluid rounded-circle me-2"
                      src={NYPL}
                      priority
                      alt="Abrar's headshot"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                    NYPL
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="work-link" eventKey="second">
                    <Image
                      className="img-fluid me-2 job-icon"
                      src={Nasa}
                      priority
                      alt="Abrar's headshot"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                    NASA
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="work-link" eventKey="third">
                    <Image
                      className="img-fluid rounded-circle me-2 job-icon"
                      src={NYPL}
                      priority
                      alt="Abrar's headshot"
                      style={{ maxWidth: "50px", maxHeight: "50px" }}
                    />
                    NYPL
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content className="glass-morph">
                <Tab.Pane eventKey="first">...</Tab.Pane>
                <Tab.Pane eventKey="second">...</Tab.Pane>
                <Tab.Pane eventKey="third">...</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
    </Row>
  );
}
