import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { LatLngExpression } from 'leaflet';
import './Maps.css'; // Styles moved to CSS

interface MapComponentProps {
  position?: LatLngExpression; // Center of the map
  zoom?: number; // Initial zoom level
  buttonText?: string; // Button text
}

const MapComponent: React.FC<MapComponentProps> = ({
  position = [51.505, -0.09], // Default position (London)
  zoom = 2, // Default zoom level
  buttonText = 'Explore Destinations', // Default button text
}) => {
  const handleButtonClick = () => {
    alert('Explore destinations button clicked!');
  };

  return (
    <Container className="map-container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body className="position-relative">
              {/* Map Section */}
              <MapContainer center={position} zoom={zoom} className="map-box">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup>This is your selected location!</Popup>
                </Marker>
              </MapContainer>

              {/* Action Button */}
              <Button
                onClick={handleButtonClick}
                className="explore-button"
                aria-label={buttonText}
              >
                {buttonText}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MapComponent;
