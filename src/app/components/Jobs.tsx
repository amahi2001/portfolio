//React Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
//assets
import NYPL from "@assets/nyplico-modified.png";
import Nasa from "@assets/NASA.png";
//react
import { Fragment, useRef } from "react";
//next
import Image, { StaticImageData } from "next/image";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  weight: ["300", "400"],
  subsets: ["latin"],
});

const LinkImage = ({ src, alt }: { src: StaticImageData; alt: string }) => (
  <Image
    className="img-fluid rounded-circle me-2"
    priority
    style={{ maxWidth: "50px", maxHeight: "50px" }}
    {...{ src, alt }}
  />
);

const Job = ({
  company,
  image,
}: {
  company: string;
  image: StaticImageData;
}) => (
  <Fragment>
    <LinkImage src={image} alt={`${company} logo`} />
    <span className="my-auto">{company}</span>
  </Fragment>
);

const Skills = ({ skillList }: { skillList: string[] }) => (
  <Stack
    as={Col}
    md={10}
    className="mx-auto flex-wrap pt-4 justify-content-center"
    direction="horizontal"
    gap={2}
  >
    {skillList.map((skill) => (
      <Badge
        pill
        bg="transparent"
        className={`${jetBrainsMono.className} border border-2 p-2`}
        key={skill}
      >
        {skill}
      </Badge>
    ))}
  </Stack>
);

function TabBody({ children }: { children: React.ReactNode }): JSX.Element {
  const badgeRef = useRef<HTMLDivElement>(null);
  function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    const scrollNum = event.currentTarget.scrollTop;
    //decrease opacity as scrollNum increases
    const opacity = 1 - scrollNum / 100;
    badgeRef.current!.style.opacity = opacity.toString();
  }

  return (
    <Fragment>
      <div className="work-body" onScroll={handleScroll}>
        {children}
      </div>
      <span ref={badgeRef} className="scroll-badge">
        Scroll Down
      </span>
    </Fragment>
  );
}

export default function Jobs(): JSX.Element {
  return (
    <Row className="justify-content-center">
      <Col sm={8} className="work-content px-0 pb-2">
        <Tabs
          defaultActiveKey="nypl1"
          id="work-experience-tabs"
          className="work-tab mb-1"
          justify
          variant="pills"
        >
          <Tab
            className="work-tab"
            eventKey="nypl1"
            title={<Job company="NYPL" image={NYPL} />}
          >
            <TabBody>
              {/* Tab content for NYPL (Aug 2022 - Present) */}
              <h3 className="text-center py-2 text-decoration-underline">
                Full Stack Engineer II
              </h3>
              <p
                className={`text-white text-center  ${jetBrainsMono.className}`}
              >
                Aug 2022 - Present
              </p>

              <p>
                Design, migrate, maintain, and implement secure and scalable
                enterprise applications and software services on{" "}
                <b>Google Cloud</b>, resulting in a notable increase in user
                satisfaction, engagement, and system performance.
              </p>
              <ul>
                <li>
                  Upgraded legacy systems to <b>Django REST</b> APIs on{" "}
                  <b>Python 3</b> and <b>React/TS</b> for improved performance,
                  UI/UX, security, and maintainability.
                </li>
                <li>
                  Led the successful migration and deployment of two critical
                  NYPL websites:{" "}
                  <a className="text-info" href="https://rs.nypl.org/">
                    NYPL Research Statistics
                  </a>{" "}
                  and{" "}
                  <a className="text-info" href="https://fellowships.nypl.org">
                    NYPL Fellowships
                  </a>
                  , serving hundreds of visitors and researchers daily.
                </li>
                <li>
                  Implemented CI/CD pipelines using <b>Cloud Build</b>,
                  monitoring/alerts, and unit/integration/e2e testing using{" "}
                  <b>Cypress, PyTest, and Django UnitTest</b>, ensuring
                  fault-free deployments and preventing system downtime.
                </li>
                <li>
                  Leveraged <b>Snyk</b> and <b>Veracode</b> to scan and fix
                  vulnerabilities and <b>Orca</b> to monitor cloud resources.
                </li>
                <li>
                  Built an AI chatbot that leverages <b>Google DialogFlow CX</b>{" "}
                  for natural language understanding and <b>PaLM 2</b> for
                  natural language generation, enabling fast and easy access to
                  employee policies and resources for thousands of internal
                  users.
                </li>
              </ul>

              <Skills
                skillList={[
                  "JavaScript",
                  "TypeScript",
                  "CSS/HTML",
                  "Angular",
                  "React",
                  "Next.js",
                  "Node.js",
                  "Python",
                  "Django",
                  "FastAPI",
                  "SQL",
                  "Redis",
                  "Docker",
                  "Kubernetes",
                  "GCP",
                  "AWS Lambda",
                  "Lang Chain",
                  "DialogFlow CX",
                ]}
              />
            </TabBody>
          </Tab>
          <Tab
            className="work-tab"
            eventKey="nasa"
            title={<Job company="NASA" image={Nasa} />}
          >
            <TabBody>
              {/* Tab content for NASA (Jun 2022 - Aug 2022) */}
              <h3 className="text-center py-2 text-decoration-underline">
                Algorithms Development Intern
              </h3>
              <p
                className={`text-white text-center  ${jetBrainsMono.className}`}
              >
                Jun 2022 - Aug 2022
              </p>
              <p>
                Developed a feature-rich <b>Python</b> framework and CLI for
                accurate estimation of Earth’s system parameters from satellite
                data under Dr. Matteo Ottaviani’s guidance.
              </p>
              <ul>
                <li>
                  Worked with astrophysicist researchers to design a retrieval
                  scheme based on a non-linear least-squares technique using the{" "}
                  <b>LMFit</b> library for Python, which{" "}
                  <b>
                    improved the performance and accuracy of the parameter
                    estimation
                  </b>
                  .
                </li>
                <li>
                  Enhanced the framework’s usability and developer experience by
                  implementing autonomous error-handling algorithms and
                  error-checking methods that raised detailed errors,{" "}
                  <b>resulting in less downtime and increased productivity.</b>
                </li>
                <li>
                  Leveraged <b>multithreading</b> and Python built-ins to
                  optimize core methods for increased efficiency and reduced
                  abstraction, resulting in faster and more streamlined
                  execution.
                </li>
                <li>
                  Authored detailed usage and program documentation adhering to
                  Google’s documentation style guide, which facilitated the
                  dissemination and adoption of the framework by other
                  researchers.
                </li>
              </ul>

              <Skills
                skillList={[
                  "Python",
                  "PyTorch",
                  "pdoc",
                  "Fortran",
                  "IDL",
                  "HDF5",
                  "Docker",
                  "Linux",
                ]}
              />
            </TabBody>
          </Tab>
          <Tab
            className="work-tab"
            eventKey="nypl2"
            title={<Job company="NYPL" image={NYPL} />}
          >
            <TabBody>
              <h3 className="text-center py-2 text-decoration-underline">
                Cloud Applications Developer Intern
              </h3>
              <p
                className={`text-white text-center  ${jetBrainsMono.className}`}
              >
                Aug 2021 - Jun 2022
              </p>
              <p>
                Delivered web applications and software solutions on <b>GCP</b>{" "}
                while adhering to best practices.
              </p>
              <ul>
                <li>
                  Created user-friendly and accessible frontends that enhanced
                  user experience and engagement by leveraging{" "}
                  <b>
                    jQuery, Bootstrap, Tailwind, DataTables, and Web-Aims
                    Guidelines
                  </b>
                  .
                </li>
                <li>
                  Utilized various GCP services such as{" "}
                  <b>
                    App engines, Cloud Scheduler, CloudSQL (MySQL and
                    PostgreSQL), and Compute Engines
                  </b>{" "}
                  to scale and secure applications/services.
                </li>
                <li>
                  Conducted unit testing with <b>PyTest</b> and{" "}
                  <b>Python unittest frameworks</b> and documented code
                  following Google’s style guides to ensure a more reliable and
                  maintainable codebase.
                </li>
                <li>
                  Led the migration and development of NYPL Services, a web app
                  for internal research statistics, from ColdFusion to{" "}
                  <b>Django</b> and <b>Python 3</b> on <b>GCP</b>,{" "}
                  <b>improving performance and maintainability</b>.
                </li>
              </ul>

              <Skills
                skillList={[
                  "JavaScript",
                  "TypeScript",
                  "CSS/HTML",
                  "React",
                  "Node.js",
                  "jQuery",
                  "Python",
                  "Django",
                  "SQL",
                  "Redis",
                  "GCP",
                  "AWS Lambda",
                ]}
              />
            </TabBody>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  );
}
