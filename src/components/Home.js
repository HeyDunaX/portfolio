import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { FaFacebook, FaTiktok, FaInstagram, FaGithub } from 'react-icons/fa';
import image from '../assets/avatar.png';

const Home = () => {
  return (
<Container id="home" fluid className="text-start py-5 home-bg">
  <Row className="p-5 col-l home">
    <Col md={6}>
      <h2 className="Name">{"I'm Duy Nhan"}</h2>  
      <h1 className="Xtitle">AI<br/>Research</h1>
      <p className="content">
        I am a student majoring in Artificial Intelligence
        at the Posts and Telecommunications Institute of Technology, with a strong passion for research
        in the field.
      </p>
      <Row className="align-items-center social flex-column flex-md-row">
        <Col md={8} className="d-flex flex-column flex-md-row align-items-center">
          <button className="me-3 btn-down mb-3 mb-md-0">Download CV <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#8953F7"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg></button>
          <div className="d-flex justify-content-center">
            <a href="https://www.facebook.com/trannhan.duy.9" className="me-2"><FaFacebook size={30} /></a>
            <a href="https://www.tiktok.com/@dunadev05?_t=8oAvgxAVKxl&_r=1" className="me-2"><FaTiktok size={30} /></a>
            <a href="https://www.instagram.com/_duynhan_?igsh=MWRwcXFqN2Y1MW53aQ==" className="me-2"><FaInstagram size={30} /></a>
            <a href="https://github.com/HeyDunaX" className="me-2"><FaGithub size={30} /></a>
          </div>
        </Col>
      </Row>
    </Col>
    <Col md={6} className="p-5 home d-flex justify-content-center">
      <div className="image-container">
        <img src={image} alt="Avatar" className="tilted-image img-fluid" />
      </div>
    </Col>
  </Row>
</Container>
  );
}

export default Home;
