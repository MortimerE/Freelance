/*import React, { useState } from 'react';
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

export default Header;*/


import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const HeaderContainer = styled(AppBar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '.5vh',
  marginBottom: '.5vh',
  // adjust as needed
});

const Logo = styled(RouterLink)(({ theme }) => ({
  // optional styling for the logo
  position: 'fixed',
  top: '1vh',
  left: '2vmin',
  '& img': {
    width: '110px',
    height: 'auto',
  },
}));

const MenuList = styled('ul')({
  width: '80vw',
  display: 'flex',
  listStyle: 'none',
  marginLeft: '15vw',
  marginRight: '10vw',
  padding: 0,
});

const MenuItem = styled('li')({
  position: 'relative',
  padding: '3vw',
  // required for the dropdown to work
});

const DropdownMenu = styled('ul')({
  position: 'absolute',
  top: '100%',
  left: 0,
  display: 'none',
  "&:hover":{
    display: 'block'
  }
  // hide by default
});

export default function Header() {
  return (
    <HeaderContainer position="static">
      <Toolbar>
        <Logo to="/" className="logo">
          <img src="Reverse Pink Oculus Logo AG new.png" alt="Oculus NZ" />
        </Logo>
        <MenuList>
          <MenuItem>
            <Button color="inherit" component={RouterLink} to="/about">
              About
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" component={RouterLink} to="/services">
              Services
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" component={RouterLink} to="/portfolio">
              Portfolio
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" component={RouterLink} to="/learn">
              Learn
            </Button>
            <DropdownMenu>
              <li>
                <Button color="inherit" component={RouterLink} to="/blog">
                  Blog
                </Button>
              </li>
              <li>
                <Button color="inherit" component={RouterLink} to="/resources">
                  Resources
                </Button>
              </li>
            </DropdownMenu>
          </MenuItem>
          <MenuItem>
            <Button color="inherit" component={RouterLink} to="/contact">
              Contact
            </Button>
          </MenuItem>
        </MenuList>
        <IconButton edge="end" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </HeaderContainer>
  );
}
