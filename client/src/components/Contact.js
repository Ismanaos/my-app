/* eslint-disable eqeqeq */
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import 'animate.css';
import Modal from 'react-bootstrap/Modal';
import TrackVisibility from 'react-on-screen';
import { API_URL } from "../config/enviroment";


const controlForm = (input) => {
  let errors = {};
  const reg = new RegExp("[a-zA-Z ]{2,254}")
  const regMessage = new RegExp("[a-zA-Z-0-9]{20,254}")
  if(!input.firstName || !reg.test(input.firstName)) errors.firstName = 'error';
  if(!input.lastName || !reg.test(input.lastName)) errors.lastName = 'error';
  if(!input.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) errors.email = 'error';
  if(!input.message || !regMessage.test(input.message)) errors.message = 'Your message must be at least 20 characters';
  return errors
}

export const Contact = () => {
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [error, setErrors] = useState({});
    const formInitialDetails = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onFormUpdate = (category, value) => {
        setFormDetails({
          ...formDetails,
          [category]: value
        })
        setErrors(controlForm({
          ...formDetails,
          [category]: value
        }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setButtonText("Sending...");

      if(Object.entries(error).length == 0 && formDetails.firstName.length > 0) {
        let response = await fetch(`${API_URL}/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify(formDetails),
        });

        setButtonText("Send");
        let result = await response.json();
        setFormDetails(formInitialDetails);
        if (result.code == 200) {
          handleShow();
        } else {
          setShowError(true);
        }
      }
      else{
        setButtonText("Send");
      }
    };

    return (
      <section className="contact" id="connect">
        <Container>
          <Row className="align-items-center">
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
                }
              </TrackVisibility>
            </Col>
            <Col size={12} md={6}>
              <TrackVisibility>
                {({ isVisible }) =>
                  <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                    {error.message || error.firstName || error.lastName || error.email ? <p className="danger">Please fill all the fields</p> : null}
                      <Col size={12} sm={6} className="px-1">
                        {error.firstName ? 
                          <input type="text" className="danger" value={formDetails.firstName} placeholder="First Name*" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                          :
                          <input type="text" className="sucess" value={formDetails.firstName} placeholder="First Name*" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
                        }
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        {error.lastName ?
                        <input type="text" className="danger" value={formDetails.lasttName} placeholder="Last Name*" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                        :
                        <input type="text" className="sucess" value={formDetails.lastName} placeholder="Last Name*" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
                        }
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        {error.email ?
                        <input type="email" className="danger" value={formDetails.email} placeholder="Email Address*" onChange={(e) => onFormUpdate('email', e.target.value)} />
                        :
                        <input type="email" className="sucess" value={formDetails.email} placeholder="Email Address*" onChange={(e) => onFormUpdate('email', e.target.value)} />
                        }
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
                      </Col>
                      <Col size={12} className="px-1">
                        {error.message ?
                          <textarea className="danger" value={formDetails.message} placeholder="Message*" onChange={(e) => onFormUpdate('message', e.target.value)} />
                          :
                          <textarea className="sucess" value={formDetails.message} placeholder="Message*" onChange={(e) => onFormUpdate('message', e.target.value)} />
                        }
                        {error.message && <p className="danger">{error.message}</p>}
                        <button type="submit"><span>{buttonText}</span></button>
                      </Col>
                    </Row>
                  </form>
                </div>}
              </TrackVisibility>
            </Col>
          </Row>
          <Modal contentClassName="modal" show={show} centered onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Message Sent!</Modal.Title>
          </Modal.Header>
          <Modal.Body> Message sent successfully, please wait for a response.</Modal.Body>
          <Modal.Footer>
            <Button variant='dark' onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Modal contentClassName="modal" show={showError} centered onHide={setShowError}>
          <Modal.Header closeButton>
            <Modal.Title>Message not Send...</Modal.Title>
          </Modal.Header>
          <Modal.Body>Parece que hubo un problema al enviar el mensaje, si el error persiste, inténtelo de nuevo más tarde.</Modal.Body>
          <Modal.Footer>
            <Button variant='dark' onClick={setShowError}>Close</Button>
          </Modal.Footer>
        </Modal>
        </Container>
      </section>
    )
}
