import React from "react";
import Recipe from "./recipe";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {},
}));
export default function RecipeResults(props) {
  const {recipesData, user} = props
  console.log(recipesData)
  const classes = useStyles();
  return (
    <Grid className={classes.root} spacing={3}>
      <Grid container spacing={2} alignItems="stretch">
        {recipesData.map((data, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} spacing={3}>
            <Recipe
              key={index}
              title={data.recipe.label}
              calories={data.recipe.calories}
              servings={data.recipe.yield}
              image={data.recipe.image}
              ingredients={data.recipe.ingredientLines}
              dietLabels={data.recipe.dietLabels}
              totalNutrients={data.recipe.totalNutrients}
              totalPercentage={data.recipe.totalDaily}
              link = {data.recipe.url}
              user = {user}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
