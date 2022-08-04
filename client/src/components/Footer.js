/* eslint-disable react/jsx-no-target-blank */
import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.svg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col size={12} sm={6}>
            <img src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/david-ismael-enriquez/" target='_blank'><img src={navIcon1} alt="Icon" /></a>
              <a href="https://github.com/Ismanaos" target='_blank'><img src={navIcon3} alt="Icon" /></a>
            </div>
            <p>Español idioma nativo</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
