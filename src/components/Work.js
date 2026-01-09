import React from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import SlideUp from './SlideUp';
import '../stylesheet/Work.css';

const projects = [
  {
    year: '2026',
    track: 'MAIN TRACK',
    rank: 'A*',
    title: 'Anonymous',
    venue: 'Anonymous', // Dòng thông tin hội nghị mới thêm
    authors: 'Anonymous',
    description: 'Abstract to be added.',
    tags: ['Low-resource NMT', 'Linguistic'],
    pdfLink: '#' 
  },
  {
    year: '2026',
    track: 'Workshop',
    rank: '',
    title: 'Not All Data Augmentation Works: A Typology-Aware Study for Low-Resource Neural Machine Translation in Vietnamese Ethnic Minority Languages',
    venue: 'AAAI-2026 Workshop LM4UC, Singapore',
    authors: 'Long Nguyen, Dat T. Truong, Nhan D. Tran, Quynh Vo, Quy Tran Nguyen, Tho Quan',
    description: 'Abstract to be added.',
    tags: ['Low-resource NMT', 'Data Augmentation'],
    pdfLink: '#'
  }
];

const Work = () => {
  return (
    <Container id="productions" fluid className="work-bg">
      <SlideUp>
        <div className="text-center mb-5">
          <h2 className="Xwork">Selected Publications</h2>
          <p className="text">Academic research and recent works</p>
        </div>

        <Row className="justify-content-center">
          {projects.map((project, index) => (
            <Col xs={12} lg={10} key={index} className="mb-4">
              <div className="pub-card">
                <Row className="align-items-start">
                  {/* Cột bên trái: Badge Meta */}
                  <Col xs={12} md={2} className="pub-meta-side mb-3 mb-md-0">
                    <div className="pub-year-box">{project.year}</div>
                    <div className="pub-track-tag">{project.track}</div>
                    <div className="pub-rank-tag">{project.rank}</div>
                  </Col>

                  {/* Cột bên phải: Nội dung chi tiết */}
                  <Col xs={12} md={10} className="pub-main-info">
                    <h4 className="pub-title-text">{project.title}</h4>
                    
                    {/* Dòng nhỏ ghi tên hội nghị - Giống ảnh 2 */}
                    <p className="pub-venue-text">{project.venue}</p>
                    
                    <p className="pub-authors-text">{project.authors}</p>
                    <p className="pub-desc-text">{project.description}</p>
                    
                    <div className="pub-footer-action">
                      <a 
                        href={project.pdfLink} 
                        className="pub-pdf-btn"
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        PDF
                      </a>
                      
                      {project.tags.map((tag, tIndex) => (
                        <Badge key={tIndex} pill className="pub-skill-tag">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
        </Row>
      </SlideUp>
    </Container>
  );
}

export default Work;