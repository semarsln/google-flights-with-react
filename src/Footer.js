import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; // İkonlar için React Icons
import "./Footer.css"
const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#f1f1f1', padding: '40px 0' }}>
      <Container>
        <Row>
          {/* Company Section */}
          <Col md={3}>
            <h4>Company</h4>
            <Nav className="flex-column">
              <Nav.Link href="#">About</Nav.Link>
              <Nav.Link href="#">Careers</Nav.Link>
              <Nav.Link href="#">Privacy Policy</Nav.Link>
              <Nav.Link href="#">Terms of Service</Nav.Link>
            </Nav>
          </Col>

          {/* Support Section */}
          <Col md={3}>
            <h4>Support</h4>
            <Nav className="flex-column">
              <Nav.Link href="#">Help Center</Nav.Link>
              <Nav.Link href="#">Contact Us</Nav.Link>
              <Nav.Link href="#">FAQs</Nav.Link>
            </Nav>
          </Col>

          {/* Follow Us Section */}
          <Col md={3}>
            <h4>Follow Us</h4>
            <div className="d-flex">
              <a href="#" className="social-icon"><FaFacebookF size={20} /></a>
              <a href="#" className="social-icon"><FaTwitter size={20} /></a>
              <a href="#" className="social-icon"><FaInstagram size={20} /></a>
              <a href="#" className="social-icon"><FaLinkedinIn size={20} /></a>
            </div>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <Row>
          <Col className="text-center" style={{ marginTop: '20px' }}>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>© 2024 Company Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
