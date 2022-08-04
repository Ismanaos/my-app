import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import loginProject from "../assets/img/login.png";
import projImg1 from "../assets/img/project-img1.png";
import registerProject from "../assets/img/register.png";
import SPAhome from "../assets/img/SPAhome.png";
import SPAcreate from "../assets/img/SPAcreate.png";
import SPAdetail from "../assets/img/SPAdetail.png";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const projectsOnDrive = [
    {
      title: "On Drive",
      description: "Design",
      imgUrl: registerProject,
    },
    {
      title: "On Drive",
      description: "Development",
      imgUrl: projImg1,
    },
    {
      title: "On Drive",
      description: "Design & Development",
      imgUrl: loginProject,
    },
  ];
  const projectsSPA = [
    {
      title: "SPA detail",
      description: "Design & Development",
      imgUrl: SPAdetail,
    },
    {
      title: "SPA home",
      description: "Design & Development",
      imgUrl: SPAhome,
    },
    {
      title: "SPA create",
      description: "Design & Development",
      imgUrl: SPAcreate,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn": ""}>
                <h2>Projects</h2>
                <p>In the bootcamp I passed several tests, some of them were to carry out various projects. Although I did two by myself, there was one that I did with several students using agile methodologies.</p>
                <Tab.Container id="projects-tabs" defaultActiveKey="first">
                  <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                      <Nav.Link eventKey="first">Tab 1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">Tab 2</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="third">Tab 3</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                    <Tab.Pane eventKey="first">
                      <Row>
                        {
                          projectsOnDrive.map((project, index) => {
                            return (
                              <ProjectCard
                                key={index}
                                {...project}
                                />
                            )
                          })
                        }
                        <p>A project that I carried out together with my colleagues from Henry with agile methodologies, deals with a service where long-distance trips are requested</p>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="section">
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                    <Row>
                        {
                          projectsSPA.map((project, index) => {
                            return (
                              <ProjectCard
                              key={index}
                              {...project}
                              />
                              )
                            })
                          }
                          <p>My first website, I developed the front end and the back end in 2 weeks</p>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                      <p>In process a React-App where you can adopt dogs and publish those that are lost</p>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  )
}
