import React, { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { FaPlane, FaMapMarkerAlt, FaTag } from 'react-icons/fa'; 
import { Tabs, Tab } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import './SearchResults.css';  // CSS dosyasını import et

const FlightAccordion = ({ flight, index }) => {
  const { legs, price } = flight;

  return (
    <Accordion key={flight.id} className="accordion">
      <AccordionSummary className="accordion-summary">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" style={{ marginRight: '20px' }}>
            {legs[0]?.origin?.city} to {legs[0]?.destination?.city || 'Unknown Destination'}
          </Typography>
          <Typography variant="h6" className="price">
            {price.formatted}
          </Typography>
        </div>
        <div className="icons">
          <FaPlane className="icon" />
          <FaMapMarkerAlt style={{ marginLeft: '10px', color: '#ff7043' }} />
        </div>
      </AccordionSummary>
      <AccordionDetails className="accordion-details">
        {legs.map((leg, index) => (
          <div key={index} className="leg-info">
            <Typography variant="body1" className="carrier">
              <FaPlane className="icon" />
              {leg.carrier}
            </Typography>
            <Typography variant="body2" className="route">
              <FaMapMarkerAlt className="icon" />
              {leg.origin.city} → {leg.destination.city}
            </Typography>
            <Typography variant="body2" className="times">
              Departure: {new Date(leg.departure).toLocaleString()} | Arrival: {new Date(leg.arrival).toLocaleString()}
            </Typography>
            <Typography variant="body2" className="duration">
              Duration: {Math.floor(leg.durationInMinutes / 60)} hours {leg.durationInMinutes % 60} minutes
            </Typography>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const SearchResults = () => {
  const location = useLocation();
  const itineraries = location.state?.itineraries || [];

  const [sortedItineraries, setSortedItineraries] = useState([]);

  // Sorting itineraries when the data is available
  useEffect(() => {
    if (itineraries.length) {
      const sorted = itineraries.sort((a, b) => {
        const priceA = parseFloat(a.price?.formatted.replace(/[^\d.-]/g, '')) || 0;
        const priceB = parseFloat(b.price?.formatted.replace(/[^\d.-]/g, '')) || 0;
        return priceA - priceB;
      });
      setSortedItineraries(sorted);
    }
  }, [itineraries]);

  const cheapestPrice = sortedItineraries?.[0]?.price?.formatted || 'N/A';

  return (
    <div className="tabs-container">
      <Tabs defaultActiveKey="home" id="fill-tab-example" className="mb-3" fill>
        <Tab eventKey="home" title="Best">
          <Typography variant="h5" className="tab-title">
            Top flights
          </Typography>
          <Typography variant="body1" className="tab-description">
            Ranked based on price and convenience. Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply. Passenger assistance info
          </Typography>
          <div>
            {itineraries.map((flight, index) => (
              <FlightAccordion key={index} flight={flight} index={index} />
            ))}
          </div>
        </Tab>
        <Tab eventKey="cheapest" title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>Cheapest</span>
            <FaTag style={{ marginLeft: '8px', color: '#ff7043' }} />
            {cheapestPrice && (
              <span style={{ marginLeft: '10px', fontSize: '16px', fontWeight: 'bold', color: '#ff7043' }}>
                {`from ${cheapestPrice}`}
              </span>
            )}
          </div>
        }>
          <Typography variant="h5" className="tab-title">
            Top flights
          </Typography>
          <Typography variant="body1" className="tab-description">
            Ranked based on price and convenience. Prices include required taxes + fees for 1 adult. Optional charges and bag fees may apply. Passenger assistance info
          </Typography>
          <div>
            {sortedItineraries.map((flight, index) => (
              <FlightAccordion key={index} flight={flight} index={index} />
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default SearchResults;
