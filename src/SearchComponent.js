import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { FaUser } from 'react-icons/fa';
import { Container, Row, Col, Form, Button, DropdownButton, Dropdown, Card } from 'react-bootstrap';
import Select from 'react-select';  // Ensure this is imported
import DatePicker from 'react-datepicker';  // Ensure this is imported
import 'react-datepicker/dist/react-datepicker.css';
import { faSearch } from '@fortawesome/free-solid-svg-icons';  // Add this import
import { useNavigate } from 'react-router-dom';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchComponent = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedFrom, setSelectedFrom] = useState(null);
  const [selectedTo, setSelectedTo] = useState(null);
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState('round');
  const [selectedClass, setSelectedClass] = useState('economy');
  const [passengerCounts, setPassengerCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });
  const [isPassengerDropdownOpen, setIsPassengerDropdownOpen] = useState(false);
  const [showTripTypeDropdown, setShowTripTypeDropdown] = useState(false);
  const navigate = useNavigate();

  const [flights, setFlights] = useState([]);  // Add state for flights

  const debouncedQuery = useDebounce(query, 500);
  
  const fetchAirports = async (searchQuery) => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${searchQuery}&locale=en-US`,
        {
          headers: {
            'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
            'x-rapidapi-key': 'add your api key',
          },
        }
      );

      const airportsData = response.data.data;
      if (Array.isArray(airportsData)) {
        const airportOptions = airportsData.map((airport) => ({
          value: airport.skyId,
          label: airport.presentation.suggestionTitle,
          entityId: airport.entityId,
        }));
        setAirports(airportOptions);
      } else {
        setAirports([]);
      }
    } catch (error) {
      console.error('Error fetching airport data:', error);
      setAirports([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debouncedQuery) {
      fetchAirports(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handlePassengerChange = (type, count) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [type]: count,
    }));
    setIsPassengerDropdownOpen(false);
  };

  const handleSearchFlights = async (e) => {
    e.preventDefault();

    if (!selectedFrom || !selectedTo) {
      alert('Please select both origin and destination airports.');
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        originSkyId: String(selectedFrom.value),
        destinationSkyId: String(selectedTo.value),
        originEntityId: String(selectedFrom.entityId),
        destinationEntityId: String(selectedTo.entityId),
        cabinClass: String(selectedClass),
        adults: String(passengerCounts.adults),
        children: String(passengerCounts.children),
        infants: String(passengerCounts.infants),
        sortBy: 'best',
        currency: 'USD',
        market: 'en-US',
        countryCode: 'US',
        date: departureDate.toISOString().split('T')[0], // Ensure proper date format as a string
        ...(tripType === 'round' && returnDate && { returnDate: returnDate.toISOString().split('T')[0] }),
      },
      headers: {
        'x-rapidapi-key': 'add your api key',
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      const itineraries = response.data.data.itineraries;
      if (itineraries) {
        setFlights(itineraries);  // Ensure you only set flights if itineraries are available
        navigate('/search-results', { state: { itineraries } });
      } else {
        console.error("Itineraries not found in the response.");
      }
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };

  const airportOptions = useMemo(() => airports, [airports]);

  const classOptions = [
    { value: 'economy', label: 'Economy' },
    { value: 'business', label: 'Business' },
    { value: 'first', label: 'First Class' },
  ];

  const passengerCategories = [
    { label: 'Adults', value: 'adults' },
    { label: 'Children', value: 'children' },
    { label: 'Infants', value: 'infants' },
  ];

  const generatePassengerOptions = () => {
    return Array.from({ length: 9 }, (_, i) => ({
      value: i + 1,
      label: `${i + 1}`,
    }));
  };
  
  const handleIncrement = (category) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] + 1,
    }));
  };

  const handleDecrement = (category) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [category]: prevCounts[category] > 0 ? prevCounts[category] - 1 : 0,
    }));
  };

  const toggleTripType = (selectedType) => {
    setTripType(selectedType);
    setShowTripTypeDropdown(false); // Close dropdown after selecting
  };

  return (
    <Container style={{ marginTop: "-25px" }}>
      <Row className="justify-content-center">
        <Col md={16}>
          <Card style={{ color: 'black', margin: '0 auto', width: '80%', height: '200px', position: 'relative', borderRadius: '24px' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', marginTop: "10px" }}>
              <Form>
                <Row className="g-2">
                  <Col md={2}>
                    {/* Round Trip dropdown */}
                    <DropdownButton
                      variant="outline-secondary"
                      title={
                        <>
                          <FontAwesomeIcon
                            icon={tripType === 'round' ? faExchangeAlt : faArrowRight}
                            style={{ marginRight: 10 }}
                          />
                          {tripType === 'round' ? 'Round Trip' : 'One Way'}
                        </>
                      }
                      id="trip-type-dropdown"
                      onSelect={toggleTripType}
                      drop="down"
                      style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        padding: '0',
                        outline: 'none',
                      }}
                    >
                      <Dropdown.Item eventKey="round">Round Trip</Dropdown.Item>
                      <Dropdown.Item eventKey="one">One Way</Dropdown.Item>
                    </DropdownButton>
                  </Col>

                  <Col md={2}>
                    {/* Class Select */}
                    <Form.Group className="mb-0">
                      <Select
                        options={classOptions}
                        value={classOptions.find((option) => option.value === selectedClass)}
                        onChange={(option) => setSelectedClass(option.value)}
                        isSearchable={false}
                        placeholder="Select Class"
                        styles={{
                          control: (base) => ({
                            ...base,
                            fontSize: '14px',
                            color: 'white',
                          }),
                        }}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    {/* Passengers Section */}
                    <Form.Group className="mb-0">
                      <DropdownButton
                        variant="outline-secondary"
                        title={<FaUser />}
                        id="passenger-dropdown"
                        style={{
                          backgroundColor: 'transparent',
                          color: 'white',
                          padding: '0',
                          width: "10px",
                        }}
                      >
                        {passengerCategories.map((category) => (
                          <Dropdown.Item key={category.value}>
                            <span>{category.label}:</span>
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleDecrement(category.value)}
                                style={{ marginRight: '10px' }}
                              >
                                -
                              </Button>
                              <span>{passengerCounts[category.value]}</span>
                              <Button
                                variant="outline-secondary"
                                onClick={() => handleIncrement(category.value)}
                                style={{ marginLeft: '10px' }}
                              >
                                +
                              </Button>
                            </div>
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    {/* From Airport */}
                    <Form.Group className="mb-0">
                      <Select
                        options={airportOptions}
                        value={selectedFrom}
                        onChange={setSelectedFrom}
                        onInputChange={setQuery}
                        isLoading={loading}
                        placeholder="From"
                        getOptionLabel={(e) => e.label}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    {/* To Airport */}
                    <Form.Group className="mb-0">
                      <Select
                        options={airportOptions}
                        value={selectedTo}
                        onChange={setSelectedTo}
                        onInputChange={setQuery}
                        isLoading={loading}
                        placeholder="To"
                        getOptionLabel={(e) => e.label}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={2}>
                    {/* Departure Date */}
                    <Form.Group className="mb-0">
                      <DatePicker
                        selected={departureDate}
                        onChange={(date) => setDepartureDate(date)}
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Departure"
                      />
                    </Form.Group>
                  </Col>

                  {tripType === 'round' && (
                    <Col md={2}>
                      {/* Return Date */}
                      <Form.Group className="mb-0">
                        <DatePicker
                          selected={returnDate}
                          onChange={(date) => setReturnDate(date)}
                          className="form-control"
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Return"
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>

                <Button variant="primary" onClick={handleSearchFlights} style={{ marginTop: '20px' }}>
                  <FontAwesomeIcon icon={faSearch} style={{ marginRight: '10px' }} /> Search
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchComponent;
