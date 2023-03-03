import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

  
function Navbar() {

  /* Nav Menu Components */
  const aboutDropdownItems = [
    { title: 'About Us', to: '/about/about-us' },
    { title: 'Our Team', to: '/about/our-team' },
    { title: 'Our Method', to: '/about/our-method' },
    { title: 'Portfolio', to: '/about/portfolio' },
    { title: 'Testimonials', to: '/about/testimonials' },
    { title: 'Events', to: '/about/events' },
    { title: 'Career', to: '/about/career' },
    { title: 'Associations', to: '/about/associations' },
  ];
  const servicesDropdownItems = [
    {title: 'Building Enclosure', to: '/services/building-enclosure'},
    {title: 'Design', to: '/services/design'},
    {title: 'Construction', to: '/services/construction'},
    {title: 'Monitoring & PS4', to: '/services/monitoring-ps4'},
    {title: 'Passive House', to: '/services/passive-house'},
    {title: 'Component Design', to: '/services/component-design'},
    {title: 'PS1', to: '/services/ps1'},
    {title: 'Modeling', to: '/services/modeling'},
    {title: 'Testing', to: '/services/testing'},
    {title: 'Investigation & Retrofit', to: '/services/investigation-retrofit'}
  ]    
  const portfolioDropdownItems = [
    {title: 'Banff Avenue', to: '/portfolio/banff-avenue'},
    {title: 'Aroha Street', to: '/portfolio/aroha-street'},
    {title: 'Galway Street', to: '/portfolio/galway-street'},
    {title: 'Great North Road Waterview', to: '/portfolio/great-north-road-waterview'},
    {title: 'Bader Ventura', to: '/portfolio/bader-ventura'},
    {title: 'Neo Apartments', to: '/portfolio/neo-apartments'},
    {title: '20 Crescent Road', to: '/portfolio/20-crescent-road'},
    {title: 'Kaplan House', to: '/portfolio/kaplan-house'},
    {title: '4 Viaduct Harbour', to: '/portfolio/4-viaduct-harbour'},
    {title: 'Fortune Road', to: '/portfolio/fortune-road'},
    {title: 'Woodford Grace', to: '/portfolio/woodford-grace'},
    {title: 'St Georges', to: '/portfolio/st-georges'},
    {title: 'Greys Avenue', to: '/portfolio/greys-avenue'},
    {title: 'Hill Crescent', to: '/portfolio/hill-crescent'},
    {title: 'Great North Road Avondale', to: '/portfolio/great-north-road-avondale'}
  ]
  const learnDropdownItems = [
    { title: 'Tools & Resources', to: '/learn/tools-resources' },
    { title: 'NZBC H1', to: '/learn/nzbc-h1' },
    { title: 'Changes', to: '/learn/changes' },
    { title: 'Podcasts', to: '/learn/podcasts' },
    { title: 'BS+BS Seminars', to: '/learn/bs-bs-seminars' },
    { title: 'Blog + BS', to: '/learn/blog-bs' },
    { title: 'Newsletter', to: '/learn/newsletter' },
  ];

  return (
    <nav>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="Reverse Pink Oculus Logo AG new.png" alt="Oculus NZ" style={{width: "110px", height: "auto"}} />
        </Link>
        <ul className="menu-list">
          <li className="menu-item dropdown">
            <Link to="/about">About</Link>
            <ul className="dropdown-menu">
              {aboutDropdownItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="menu-item dropdown">
            <Link to="/services">Services</Link>
            <ul className="dropdown-menu">
              {servicesDropdownItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/projects">Portfolio</Link>
            <ul className="dropdown-menu">
              {portfolioDropdownItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="menu-item dropdown">
            <Link to="/learn">Learn</Link>
            <ul className="dropdown-menu">
              {learnDropdownItems.map((item, index) => (
                <li key={index}>
                  <Link to={item.to}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="menu-item">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>

  );
};

export default Navbar;