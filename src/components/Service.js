import React from 'react';
import { Container } from 'react-bootstrap';

const Service = () => {
  return (
    <Container id="projects" fluid className=" service-bg">
      <h2 className="title" id="title">My Quality Services</h2>
      <p className="text">We turn research ideas into intelligent systems - bridging theory and real-world applications of AI</p>
      <table className="custom-table">
        <tbody>
          <tr>
            <td className="jobs">01</td>
            <td className="jobs">NLP</td>
            <td className="introduction">I explore how machines can understand and generate human language through techniques like <b>Machine Translation</b> and <b>Language Modeling.</b></td>
          </tr>
          <tr>
            <td className="jobs">02</td>
            <td className="jobs">Gen AI System</td>
            <td className="introduction">I design and build Generative AI applications such as website content generation and dialogue models.</td>
          </tr>
          <tr>
            <td className="jobs">03</td>
            <td className="jobs">RAG</td>
            <td className="introduction">I research and implement <b>RAG pipelines</b> that combine large language models with external knowledge bases.</td>
          </tr>
        </tbody>
      </table>
    </Container>

  );
}

export default Service;
