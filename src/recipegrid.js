import React, { handleClick, useState } from "react";
import Recipe from './recipe';
import style from './RecipeGrid.module.css'




class RecipeGrid extends React.Component {
    constructor({recipesData}) {
        super();
        this.state = {
            recipesData: recipesData,
        };
        console.log(this.state.recipesData);
           }

           

    render() {
        return (
            <div className = {style.recipes}>
        {this.state.recipesData.map(data =>(
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
        </div>
        )
    }
}


export default RecipeGrid;