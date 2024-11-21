import React from 'react';

const ImageCentered = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent', // Background color is optional
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '70%', // Image width
          maxWidth: '100%', // Maximum width
          height: '400px', // Image height
        }}
      >
        <img
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '15px', // Round the corners
          }}
        />
        {/* Transparent transition area */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '30%', // Transparency height
            background: 'transparent',
            borderRadius: '0 0 15px 15px', // Make corners consistent
          }}
        />
        {/* Title at the bottom-center */}
        <div
          style={{
            position: 'absolute',
            bottom: '10%', // Position the title slightly above the bottom
            left: '50%',
            transform: 'translateX(-50%)', // Center the title horizontally
            fontSize: '35px',
            color: 'black', // Title color
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Optional text shadow for better visibility
          }}
        >
          Flights
        </div>
      </div>
    </div>
  );
};

export default ImageCentered;
