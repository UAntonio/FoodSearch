import React from "react";
import Recipe from "./recipe";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function RecipeGrid({ recipesData }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} spacing={3}>
      <Grid container spacing={2} alignItems="stretch">
        {recipesData.map((data) => (
          <Grid item xs={3} s={6} m={4} l={3} spacing={3}>
            <Recipe
              key={data.recipe.label}
              title={data.recipe.label}
              calories={data.recipe.calories}
              servings={data.recipe.yield}
              image={data.recipe.image}
              ingredients={data.recipe.ingredientLines}
              dietLabels={data.recipe.dietLabels}
              totalNutrients={data.recipe.totalNutrients}
              totalPercentage={data.recipe.totalDaily}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
