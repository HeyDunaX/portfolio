import React from 'react';
import { Container } from 'react-bootstrap';

const Service = () => {
  return (
    <Container id="projects" fluid className=" service-bg">
      <h2 className="title" id="title">Popular Topics</h2>
      <p className="text">I have always been passionate about solving pressing problems in the field of natural language processing and contributing new solutions recommended to AI researchers</p>
      <table className="custom-table">
        <tbody>
          <tr>
            <td className="jobs">01</td>
            <td className="jobs">Neural Machine Translation</td>
            <td className="introduction">I researched and raised the question of what would happen to Vietnam's ethnic minority languages in the age of AI, and I contributed a bilingual <b>Tay-Vietnamese dataset</b> for text conversion.</td>
          </tr>
          <tr>
            <td className="jobs">02</td>
            <td className="jobs">Information Retrieval</td>
            <td className="introduction">I have developed an <b>Information Retrieval</b> system to serve specialized general education according to the current curriculum using basic techniques.</td>
          </tr>
          <tr>
            <td className="jobs">03</td>
            <td className="jobs">LLM</td>
            <td className="introduction">Contribute AI-powered tools to assist teachers in creating practice test questions based on the current curriculum.</td>
          </tr>
        </tbody>
      </table>
    </Container>

  );
}

export default Service;
