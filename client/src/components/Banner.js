/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import { API_URL } from "../config/enviroment";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [connect, setConnect] = useState({
    email: '',
    message: '',
  });
  const [connectEnd, setConnectEnd] = useState(connect);
  //Estados
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loopNum, setLoopNum] = useState(0);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  //Rotación del texto
  const toRotate = [ "Web Developer", "Web Back-End", "Web Front-End" ];
  const period = 2000;

  const handleChange = (category, value) => {
    setConnect({
      ...connect,
      [category]: value
    })
  }
  
  const handleConnect = async(e) => {
    e.preventDefault();
    setButtonText("Sending...");
    let response = await fetch(`${API_URL}/connect`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(connectEnd),
    })
    setButtonText("Send");
    setConnectEnd(connect);
    const result = await response.json();
    if (result.code == 200) {
      setStatus({ succes: true, message: 'Message sent, thanks for contacting you' });
    } else {
      setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
    }
  }

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Ismael`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "Web Back-End", "Web Front-End" ]'><span className="wrap">{text}</span></span></h1>
                  <p>I am a graduate of the Henry platform with great adaptability to any work environment, I integrate easily. I learn very fast and I am always studying new technologies.</p>
                  <button onClick={(e) => setShow(true)}>Let’s Connect <ArrowRightCircle size={25} /></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <Modal centered={true} show={show} onHide={handleClose}>
      
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => handleChange('email', e.target.value)}
                value={connect.email}
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              type="text"
              onChange={(e)=> handleChange('message', e.target.value)}
              value={connect.message}
              placeholder="Hello, I would like to talk..."
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConnect}>
            {buttonText}
          </Button>
          {
            status.message &&
            <Col>
              <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
            </Col>
          }
        </Modal.Footer>
      </Modal>
    </section>
  )
}
