import React, { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css'; // Import CSS styles

// Define button configurations for dynamic rendering
const buttons = [
  { icon: 'bi-bag', text: 'Travel' },
  { icon: 'bi-globe', text: 'Explore' },
  { icon: 'bi-airplane', text: 'Flights' },
  { icon: 'bi-house-fill', text: 'Hotels' },
  { icon: 'bi-house-door', text: 'Vacation rentals' },
];

const Header = () => {
  const [showDrawer, setShowDrawer] = useState(false); // State for managing Offcanvas visibility

  const toggleDrawer = () => setShowDrawer(!showDrawer); // Toggles the Offcanvas drawer

  return (
    <div>
      {/* Navbar Section */}
      <Navbar bg="light" variant="light" expand="lg" className="header-navbar">
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <div className="d-flex">
              {/* Dynamically Render Buttons */}
              {buttons.map((btn, index) => (
                <Button key={index} className="header-button">
                  <i className={`bi ${btn.icon}`} /> {btn.text}
                </Button>
              ))}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Offcanvas Drawer Section */}
      <Offcanvas
        show={showDrawer}
        onHide={toggleDrawer}
        placement="start"
        className="header-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav>
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Services</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default Header;
