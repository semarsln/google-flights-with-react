import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home";
import SearchResults from "./SearchResults";
import SearchComponent from "./SearchComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage />} // HomePage component
        />
        <Route
          path="/explore"
          element={<SearchComponent />} // SearchComponent
        />
        <Route
          path="/search-results"
          element={<SearchResults />} // SearchResults component
        />
      </Routes>
    </Router>
  );
}

export default App;
