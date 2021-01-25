import React, { useEffect, useState } from "react";
import RecipeGrid from "./components/recipegrid";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import api from './utils/api';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  Container:{
    paddingBottom: 50,
    paddingTop: 50,
  },
  form:{
    paddingBottom: "inherit",
    minHeight:10,
    display: "flex",
    justifyContent: "center",
    alignItems:"center",
  },
  searchBar:{
    width: "50%",
    border: "none",
    padding: 10,
  },
  searchButton:{
    padding:10
  },
}));

const App = () => {
  //environment tools to get this data
  const [recipesData, setRecipesData] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("Chicken");

  useEffect(() => {

    const GetRecipes = async () => {
      api.fetchRecipes(`?query=${query}`).then((response)=>{
        console.log("last: " + response.details.hits);
        setRecipesData(response.details.hits);
      })
    };
    GetRecipes();
  }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setQuery(search);
    setSearch("");
  };
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" classes = {classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Food Search
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl" className={classes.Container}>
        <form
          onSubmit={getSearch}
          noValidate
          autoComplete="off"
          onChangeCapture={updateSearch}
          className={classes.form}
        >
          <TextField
          className={classes.searchBar}
            id="outlined-basic"
            label="Search-food"
            variant="outlined"
          />
          <Button className={classes.searchButton} variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
        {recipesData.length > 0 ? (
          <RecipeGrid recipesData={recipesData} />
        ) : null}
        
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/pause08" title="Pause08">
          Pause08
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </Container>
    </div>
  );
};

export default App;
