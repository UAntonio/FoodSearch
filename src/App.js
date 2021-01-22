import React,{useEffect, useState} from "react";
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
    console.log(data.hits);
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

      {/* <RecipeGrid
      recipesData = {recipesData}
      /> */}
      {/* <div className = "recipes">
        {recipesData.map(data =>(
          <Recipe 
          key= {data.recipe.label}
          title = {data.recipe.label}
          calories = {data.recipe.calories}
          image = {data.recipe.image}
          ingredients = {data.recipe.ingredients}
          dietLabels = {data.recipe.dietLabels}
          totalNutrients ={data.recipe.totalNutrients}
          totalPercentage = {data.recipe.totalDaily}
          />
        ))};
        </div> */}
        
           Icons made by <a href="https://www.flaticon.com/authors/pause08" title="Pause08">Pause08</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    </div>
    
  );
}

export default App;
