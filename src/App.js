import React,{useEffect, useState} from "react";
import RecipeGrid from './recipegrid';
import './App.css';


const App = () =>{


  //environment tools to get this data
  const APP_ID =  process.env.REACT_APP_APP_ID;
  const APP_KEY =  process.env.REACT_APP_APP_KEY;

  const [recipesData, setRecipesData] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('Chicken');


  useEffect(()=>{
    GetRecipes();
  },[query])

  const GetRecipes = async ()=>{

    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipesData(data.hits);
  }

  const updateSearch = e =>{
    setSearch(e.target.value);
  }

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className = "App">
      <form onSubmit = {getSearch} className ="search-form">
        <input className= "search-bar" type="text" value = {search} onChange={updateSearch} />
        <button 
        className = "search-button" type="submit">Search</button>
      </form>

      <RecipeGrid
      recipesData = {recipesData}
      />
    </div>
  );
}

export default App;