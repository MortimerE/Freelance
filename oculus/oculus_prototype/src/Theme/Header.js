import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hamburger from './Components/Hamburger';

function Header() {

    return (
      <div className = "header-container">
        <Router>
          <Link to="/" className="logo">
              <img src="Reverse Pink Oculus Logo AG new.png" alt="Oculus NZ" style={{width: "110px", height: "auto"}} />
          </Link>
            <Navbar />
            <Routes>
            <Route path="/about" element={<h1>About</h1>}>
            </Route>
            <Route path="/services" element={<h1>Services</h1>}>
            </Route>
            <Route path="/portfolio" element={<h1>Portfolio</h1>}>
            </Route>
            <Route path="/learn" element={<h1>Learn</h1>}>
            </Route>
            <Route path="/contact" element={<h1>Contact</h1>}>
            </Route>
            </Routes>
        </Router>
        <Hamburger />
      </div>
    );
}

export default Header;
