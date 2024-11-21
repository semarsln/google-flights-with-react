import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // React Router
import SearchComponent from './SearchComponent';
import Header from './Header';
import ToolsSection from './ToolsSection';
import Faqs from './Faq';
import ImageCard from './CardImage';
import MapComponent from './MapComponent';
import Footer from './Footer';

// Sayfa 1
function HomePage() {
  return (
    <div className="homePage">
      <Header />
      <ImageCard />
      <SearchComponent  /> {/* SearchComponent'e veri gönder */}
      <MapComponent />
      <ToolsSection />
      <Faqs />
      <Footer/>
    </div>
  );
}

export default HomePage