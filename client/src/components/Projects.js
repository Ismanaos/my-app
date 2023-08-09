import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import loginProject from "../assets/img/login.png";
import projImg1 from "../assets/img/project-img1.png";
import registerProject from "../assets/img/register.png";
import contabilidadCanela from "../assets/img/contabilidadCanela.png";
import contactoAxel from "../assets/img/contactoAxel.png";
import contactoAxelLanding from "../assets/img/contactoAxelLanding.png";
import landingAxel from "../assets/img/landingAxel.png";
import landingCanela from "../assets/img/landingCanela.png";
import cuentasCanela from "../assets/img/cuentasCanela.png";
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
  const projectsAxel = [
    {
      title: "Landing",
      description: "Design & Development",
      imgUrl: landingAxel,
    },
    {
      title: "Contacto Landing",
      description: "Design & Development",
      imgUrl: contactoAxelLanding,
    },
    {
      title: "Contacto",
      description: "Design & Development",
      imgUrl: contactoAxel,
    },
  ];
  const projectsCanela = [
    {
      title: 'Canela Landing',
      description: 'Design & Development',
      imgUrl: landingCanela
    },
    {
      title: 'Canela Contability',
      description: 'Design & Development',
      imgUrl: contabilidadCanela
    },
    {
      title: 'Canela Accounts Payable',
      description: 'Design & Development',
      imgUrl: cuentasCanela
    }
  ]

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
                          projectsCanela.map((project, index) => {
                            return (
                              <ProjectCard
                              key={index}
                              {...project}
                              />
                              )
                            })
                          }
                          <p>My first freelance project for a company that needed an administration system.</p>
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                    <Row>
                        {
                          projectsAxel.map((project, index) => {
                            return (
                              <ProjectCard
                              key={index}
                              {...project}
                              />
                              )
                            })
                        }
                        <p>One of my latest projects for a construction company.</p>
                      </Row>
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
