import React, { useState } from 'react';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
import { FaBell, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import "./ToolsSection.css";

const tools = [
  {
    title: 'Find the cheapest days to fly',
    content: 'The Date grid and Price graph make it easy to see the best flight deals',
    icon: <FaBell size={20} />,
    bodyTitle: 'Insightful tools help you choose your trip dates',
    body: 'If your travel plans are flexible, use the form above to start searching for a specific trip. Then, play around with the Date grid and Price graph options on the Search page to find the cheapest days to get to your destination – and back again for round trips.',
    image: 'https://blog.mobiscroll.com/wp-content/uploads/2016/01/flight-booking-app.png'
  },
  {
    title: 'See the whole picture with price insights',
    content: 'Price history and trend data show you when to book to get the best price on your flight',
    icon: <FaCalendarAlt size={20} />,
    bodyTitle: 'Get smart insights about flight prices',
    body: 'Real-time insights can tell you if a fare is lower or higher than usual, and if the fare you’re seeing is a good price. So, you don’t have to worry about paying too much for a flight or missing out on the cheapest time to book. On some routes, you might also see historical data that helps you better understand how flight prices vary over time.',
    image: 'https://letswandertogether.com/wp-content/uploads/2024/09/DALL%C2%B7E-2024-09-02-19.25.18-A-wide-image-of-a-travelers-desk-with-fewer-items-showing-a-laptop-with-an-online-flight-search-displaying-a-list-of-flight-options-with-different-p.webp'
  },
  {
    title: 'Track prices for a trip',
    content: 'Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop.',
    icon: <FaDollarSign size={20} />,
    bodyTitle: 'Monitor flight prices and make sure you never miss a price change',
    body: 'Effortlessly track prices for specific travel dates or for any dates, if your plans are flexible, to uncover the best deals. You can easily set up tracking for multiple routes while searching for flights and opt-in to receive email updates when the price changes. Once that’s done, you can come back to your Tracked Flights page to monitor prices whenever you like, or relax knowing you’ll never miss a flight deal.',
    image: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2024/05/image11.png'
  },
];

const ToolsSection = () => {
  const [selectedTool, setSelectedTool] = useState(tools[0]);

  const handleCardClick = (tool) => {
    setSelectedTool(tool);
  };

  return (
    <section id="tools" className="tools-section">
      <Container>
        <Row className="align-items-center">
          <h2 className="tools-title">Useful Tools to Help You Find the Best Deals</h2>
          <Col md={4}>
            {tools.map((tool, index) => (
              <Card
                key={index}
                className={`mb-3 card-background ${selectedTool === tool ? 'selected-card' : ''}`}
                onClick={() => handleCardClick(tool)}
                role="button"
                aria-label={`Select tool: ${tool.title}`}
                tabIndex={0}
              >
                <Card.Body>
                  <div className="icon-container">{tool.icon}</div>
                  <Card.Title>{tool.title}</Card.Title>
                  <Card.Text>{tool.content}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
          <Col md={8}>
            {selectedTool ? (
              <Alert variant="info" className="tool-alert">
                <h4>{selectedTool.bodyTitle}</h4>
                <p>{selectedTool.body}</p>
                <img src={selectedTool.image} alt={selectedTool.title} className="alert-image" />
              </Alert>
            ) : (
              <p>Please select a tool to view more information.</p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ToolsSection;
