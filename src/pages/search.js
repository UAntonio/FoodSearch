import React, { useState } from "react";
import api from "../utils/api";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RecipeResults from "../components/recipeResults";

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
  Container: {
    paddingBottom: 50,
    paddingTop: 50,
  },
  form: {
    paddingBottom: "inherit",
    minHeight: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    width: "50%",
    border: "none",
    padding: 10,
  },
  searchButton: {
    padding: 10,
  },
}));

export default function SearchPage(props) {
  const {user, query ,setQuery,recipesData, setRecipesData}  = props;
  const classes = useStyles();
  const [search, setSearch] = useState("");


  const GetRecipes = async () => {
    api.fetchRecipes(`?query=${query}`).then((response) => {
      setRecipesData(response.details.hits);
    });
  };
  // useEffect(() => {
  //   GetRecipes();
  // }, [query]);

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
    GetRecipes();
  };
  return (
    <Container maxWidth="xl" className={classes.Container}>
       <form
        onSubmit={getSearch}
        noValidate
        autoComplete="off"
        onChange={updateSearch}
        className={classes.form}
      >
         <TextField
          className={classes.searchBar}
          id="outlined-basic"
          label="Search-food"
          variant="outlined"
        />
        <Button
          className={classes.searchButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Search
        </Button> 
      </form> 
      {recipesData.length > 0 ? (
        <RecipeResults recipesData={recipesData} user = {user} />
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
  );
}
