/*import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '0.5vh',
    marginBottom: '0.5vh',
    // adjust as needed
  },
  logo: {
    // optional styling for the logo
    position: 'fixed',
    top: '1vh',
    left: '2vmin',
  },
  menuList: {
    width: '80vw',
    display: 'flex',
    listStyle: 'none',
    marginLeft: '15vw',
    marginRight: '10vw',
    padding: 0,
  },
  menuItem: {
    position: 'relative',
    padding: '3vw',
    // required for the dropdown to work
    '&:hover $dropdownMenu': {
      display: 'block',
      // show on hover
    },
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    display: 'none',
    // hide by default
  },
}));

export default useStyles;*/

import { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';

const StyledAppBar = styled(AppBar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '.5vh',
  marginBottom: '.5vh',
  // adjust as needed
});

const Logo = styled('div')({
  // optional styling for the logo
  position: 'fixed',
  top: '1vh',
  left: '2vmin',
});

const MenuList = styled('ul')({
  width: '80vw',
  display: 'flex',
  listStyle: 'none',
  marginLeft: '15vw',
  marginRight: '10vw',
  padding: 0,
});

const MenuItemWrapper = styled('li')({
  position: 'relative',
  padding: '3vw',
  // required for the dropdown to work
});

const DropdownMenu = styled('ul')({
  position: 'absolute',
  top: '100%',
  left: 0,
  display: 'none',
  // hide by default
  '&:hover': {
    display: 'block',
    // show on hover
  },
});

