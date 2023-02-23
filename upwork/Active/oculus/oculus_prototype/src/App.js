import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav>
      <div className="header-container">
        <div className="logo">Your Logo</div>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/about">About</Link>
          </li>
          <li className="menu-item dropdown">
            <Link to="/services">Services</Link>
            <ul className="dropdown-menu">
              <li>
                <Link to="/services/web-design">Web Design</Link>
              </li>
              <li>
                <Link to="/services/web-development">Web Development</Link>
              </li>
              <li>
                <Link to="/services/mobile-development">Mobile Development</Link>
              </li>
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li className="menu-item">
            <Link to="/learn">Learn</Link>
          </li>
          <li className="menu-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div>
        <Header />
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
      </div>
    </Router>
  );
}

export default App;


