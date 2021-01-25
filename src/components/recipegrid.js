import React from "react";
import Recipe from "./recipe";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
     
    }
  }));

export default function RecipeGrid({ recipesData }) {
    const classes = useStyles();
    
  return (
    <Grid className = {classes.root} spacing={3}>
      <Grid item xs={3}  spacing={5}>
       <Grid container justify="space-between" spacing={4}>
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
           ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
