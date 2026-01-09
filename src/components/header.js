import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link as ScrollLink } from 'react-scroll';
import '../stylesheet/Header.css';
import '../stylesheet/Color.css'

const Header = () => {
  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    for (const link of links) {
      link.addEventListener("click", function(e) {
        e.preventDefault();

        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      });
    }

    // Cleanup event listeners on unmount
    return () => {
      for (const link of links) {
        link.removeEventListener("click", function(e) {
          e.preventDefault();
        });
      }
    };
  }, []);

  const [active, setActive] = useState('home');

  const handleSetActive = (to) => {
    setActive(to);
  };

  return (
    <Navbar expand="lg" sticky="top" className="service-bg navbar">
      <Navbar.Brand href="#home" style={{ color: '#ffffff' }} className="brand"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="50px" fill="#FFFFFF"><path d="M236-345 100-480l440-440h271L236-345ZM540-40 303-277l237-237h271L574-277 811-40H540Z"/></svg>DunaX</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <ScrollLink
            to="home"
            smooth={true}
            duration={150}
            className={`nav-link ${active === 'home' ? 'active' : ''}`}
            onSetActive={() => handleSetActive('home')}
            style={{ color: '#ffffff' }}
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="projects"
            smooth={true}
            duration={150}
            className={`nav-link ${active === 'projects' ? 'active' : ''}`}
            onSetActive={() => handleSetActive('projects')}
            style={{ color: '#ffffff' }}
          >
            Topic
          </ScrollLink>
          <ScrollLink
            to="productions"
            smooth={true}
            duration={150}
            className={`nav-link ${active === 'productions' ? 'active' : ''}`}
            onSetActive={() => handleSetActive('productions')}
            style={{ color: '#ffffff' }}
          >
            Publications
          </ScrollLink>
          <ScrollLink
            to="issue"
            smooth={true}
            duration={150}
            className={`nav-link ${active === 'issue' ? 'active' : ''}`}
            onSetActive={() => handleSetActive('issue')}
            style={{ color: '#ffffff' }}
          >
            Skill
          </ScrollLink> 
          <ScrollLink
            to="about"
            smooth={true}
            duration={150}
            className={`nav-link ${active === 'about' ? 'active' : ''}`}
            onSetActive={() => handleSetActive('about')}
            style={{ color: '#ffffff' }}
          >
            Awards
          </ScrollLink> 
          <ScrollLink
            to="news"
            smooth={true}
            duration={150}
            className={`nav-link ${active === 'news' ? 'active' : ''}`}
            onSetActive={() => handleSetActive('news')}
            style={{ color: '#ffffff' }}
          >
            Blog
          </ScrollLink> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
