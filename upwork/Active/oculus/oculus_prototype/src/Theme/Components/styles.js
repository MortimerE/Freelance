import { makeStyles } from '@mui/styles';

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

export default useStyles;
