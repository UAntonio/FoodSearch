import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import CssBaseline from "@material-ui/core/CssBaseline";
import { IconButton } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  orange,
  lightBlue,
  deepPurple,
  deepOrange,
} from "@material-ui/core/colors";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import FavoritesPage from "./pages/favorites";
import SearchPage from "./pages/search";
import { useAuthListener } from "./hooks";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FirebaseContext } from "./context/firebase";
import { Alert, AlertTitle } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App = () => {
  const classes = useStyles();
  const { user } = useAuthListener();

  const { firebase } = useContext(FirebaseContext);
  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[900];
  const [open, setOpen] = React.useState(false);
  
  const [query, setQuery] = useState("Chicken");
  const [recipesData, setRecipesData] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setError("");
    setOpen(false);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    firebase
    .auth()
    .signInWithEmailAndPassword(emailAddress,password)
    .then(()=>{
      //push to favorites??
      //history.pushState(ROUTES.FAVORITES);
      handleClose();
    }).catch((error)=>{
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    })
  };
  const handleSignUp = (event) => {
    event.preventDefault();
    return firebase
      .auth()
      .createUserWithEmailAndPassword(emailAddress, password)
      .then((result) =>
        result.user
          .updateProfile({
            displayName: firstName,
          })
          .then(() => {
            handleClose();
            // history.push(ROUTES.FAVORITES);
          })
      )
      .catch((error) => {
        setFirstName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };
  const handleLogOut = (event)=>{
    return firebase
    .auth().signOut();
  }

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `nav-tab-${index}`,
      "aria-controls": `nav-tabpanel-${index}`,
    };
  }

  function LinkTab(props) {
    return (
      <Tab
        component="a"
        onClick={(event) => {
          event.preventDefault();
        }}
        {...props}
      />
    );
  }

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <AppBar position="static" classes={classes.root}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Food Search
            </Typography>
            {user && <Typography variant = "body2">
              Welcome {user.displayName}
            </Typography>
}
            <Tabs
              variant="fullWidth"
              value={value}
              onChange={handleChange}
              aria-label="nav tabs"
            >
              <LinkTab label="Main" href="/results" {...a11yProps(0)} />
              {user && <LinkTab label="Favorites" href="/favorites" {...a11yProps(1)} /> }
            </Tabs>
            <IconButton color="inherit" onClick={handleThemeChange}>
              <Brightness4Icon />
            </IconButton>
            {!user && <Button onClick={handleClickOpen} color="inherit">
              Login
            </Button>}
            {user &&
              <Button color="inherit" onClick={handleLogOut} >Logout</Button>
            }
          </Toolbar>
        </AppBar>
        <TabPanel value={value} index={0}>
           <SearchPage user = {user} 
           query = {query}
            setQuery={setQuery}
            recipesData = {recipesData}
            setRecipesData = {setRecipesData}/> 
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FavoritesPage user = {user} />
        </TabPanel>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Typography>
              To Log in please provide Email Address and Password.
              </Typography>
              <Typography>
              For Sign up please provide userName, Email Address and Password.
              </Typography>
              <Typography>
              Email: exampleUser@gmail.com
              Password: exampleUser
              </Typography>
            </DialogContentText>
            {error &&  <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>{error}</strong>
      </Alert>}

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="First Name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              value={emailAddress}
              onChange={({ target }) => setEmailAddress(target.value)}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleLogin} color="primary">
              Login
            </Button>
            <Button onClick={handleSignUp} color="primary">
              Sign up
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};

export default App;
