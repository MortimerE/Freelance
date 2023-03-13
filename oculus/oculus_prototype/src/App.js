import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function handleMobileMenuClick() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <nav>
      <ul className="menu-list">
        <li className="menu-item dropdown">
          <Link to="/about">About</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/about/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/about/our-team">Our Team</Link>
            </li>
            <li>
              <Link to="/about/our-method">Our Method</Link>
            </li>
            <li>
              <Link to="/about/portfolio">Portfolio</Link>
            </li>
            <li>
              <Link to="/about/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link to="/about/events">Events</Link>
            </li>
            <li>
              <Link to="/about/career">Career</Link>
            </li>
            <li>
              <Link to="/about/associations">Associations</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item dropdown">
          <Link to="/services">Services</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/services/building-enclosure">Building Enclosure</Link>
            </li>
            <li>
              <Link to="/services/design">Design</Link>
            </li>
            <li>
              <Link to="/services/construction">Construction</Link>
            </li>
            <li>
              <Link to="/services/monitoring-ps4">Monitoring & PS4</Link>
            </li>
            <li>
              <Link to="/services/passive-house">Passive House</Link>
            </li>
            <li>
              <Link to="/services/component-design">Component Design</Link>
            </li>
            <li>
              <Link to="/services/ps1">PS1</Link>
            </li>
            <li>
              <Link to="/services/modeling">Modeling</Link>
            </li>
            <li>
              <Link to="/services/testing">Testing</Link>
            </li>
            <li>
              <Link to="/services/investigation-retrofit">Investigation & Retrofit</Link>
            </li>
            <li>
              <Link to="/services/product-compliance-engineering">Product Compliance & Engineering</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item dropdown">
          <Link to="/portfolio">Portfolio</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/portfolio/banff-avenue">Banff Avenue</Link>
            </li>
            <li>
              <Link to="/portfolio/aroha-street">Aroha Street</Link>
            </li>
            <li>
              <Link to="/portfolio/galway-street">Galway Street</Link>
            </li>
            <li>
              <Link to="/portfolio/great-north-road-waterview">Great North Road Waterview</Link>
            </li>
            <li>
              <Link to="/portfolio/bader-ventura">Bader Ventura</Link>
            </li>
            <li>
              <Link to="/portfolio/neo-apartments">Neo Apartments</Link>
            </li>
            <li>
              <Link to="/portfolio/20-crescent-road">20 Crescent Road</Link>
            </li>
            <li>
              <Link to="/portfolio/kaplan-house">Kaplan House</Link>
            </li>
            <li>
              <Link to="/portfolio/4-viaduct-harbour">4 Viaduct Harbour</Link>
            </li>
            <li>
              <Link to="/portfolio/fortune-road">Fortune Road</Link>
            </li>
            <li>
              <Link to="/portfolio/woodford-grace">Woodford Grace</Link>
            </li>
            <li>
              <Link to="/portfolio/st-georges">St Georges</Link>
            </li>
            <li>
              <Link to="/portfolio/greys-avenue">Greys Avenue</Link>
            </li>
            <li>
              <Link to="/portfolio/hill-crescent">Hill Crescent</Link>
            </li>
            <li>
              <Link to="/portfolio/great-north-road-avondale">Great North Road Avondale</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item dropdown">
          <Link to="/learn">Learn</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/learn/tools-resources">Tools & Resources</Link>
            </li>
            <li>
              <Link to="/learn/nzbc-h1">NZBC H1</Link>
            </li>
            <li>
              <Link to="/learn/changes">Changes</Link>
            </li>
            <li>
              <Link to="/learn/podcasts">Podcasts</Link>
            </li>
            <li>
              <Link to="/learn/bs-bs-seminars">BS+BS Seminars</Link>
            </li>
            <li>
              <Link to="/learn/blog-bs">Blog + BS</Link>
            </li>
            <li>
              <Link to="/learn/newsletter">Newsletter</Link>
            </li>
          </ul>
        </li>
        <li className="menu-item dropdown">
          <Link to="/contact">Contact</Link>
          <ul className="dropdown-menu">
            <li>
              <Link to="/contact/linkedin">LinkedIn</Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="mobile-menu" onClick={handleMobileMenuClick}>
        <div className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`mobile-menu-panel ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* ... */}
      </div>
    </nav>
    
  );
};

function Content() {
  //something
  return (
    //something
    <div className="content">
      <img src="logo512.png"></img>
    </div>
  );
}

function Sitemap() {
  //something
  return (
    //something
    <div className="sitemap">
      
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="left">
        <ul>
          <li><p>&copy; 2023 - @ Oculus Architectural Engineering Ltd</p></li>
          <li>
            <a href="#">Privacy Statement</a>
            <a href="#">Terms and Conditions</a>
          </li>
        </ul>
      </div>
      <div className="right">
        <ul>
          <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
          <li><a href="#"><i class="fa fa-facebook"></i></a></li>
          <li><a href="#"><i class="fa fa-instagram"></i></a></li>
        </ul>
        <img src="Reverse White Oculus Logo transparent bg.png" alt="Oculus NZ"/>
      </div>
    </footer>
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
      <div>
        <Content></Content>
      </div>
      <div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


