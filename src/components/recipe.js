import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Collapse from "@material-ui/core/Collapse";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ReactCardFlip from "react-card-flip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CardMedia, IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // borderRadius: 10,
    // margin: 20,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    // alignitems: "center",
    // maxHeight: "35%"
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  list: {
    // width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 150,
    maxWidth: 100,
  },
  recipe: {
    // borderRadius: 10,
    // margin: 20,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "space-around",
    // alignitems: "center",
    // minwWidth: "40%",
  },
  image: {
    borderRadius: "50%",
    width: 100,
    height: 100,
  },
  dietLabels: {
    height: 60,
  },
  ingredients: {
    // width: "80%",
    // display: "flex",
    // justifyContent: "left",
    // alignItems: "center",
  },
  caloriesCard: {},
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

export default function RecipeCard({
  title,
  ingredients,
  servings,
  calories,
  image,
  totalNutrients,
}) {
  const classes = useStyles();

  const [isFlipped, setisFlipped] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const totalCalories = Math.round(calories / servings);

  const handleClick = () => {
    setisFlipped(!isFlipped);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var nutrients = [];
  for (var NutrientsKey in totalNutrients) {
    if (totalNutrients.hasOwnProperty(NutrientsKey)) {
      nutrients.push(totalNutrients[NutrientsKey]);
    }
  }
  //remove duplicate data and add numbers
  for(var ingredient in ingredients){
    console.log(ingredient)
  }
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card className={classes.root}>
        <CardActions onClick={handleClick}>
          <CardHeader title={title} subheader={"Calories: " + totalCalories +"\t Servings: " + servings}/>
        </CardActions>
        <CardMedia className={classes.media} image={image} title={title} />
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <Typography>Ingredients</Typography>
          <ExpandMoreIcon />
        </IconButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.ingredients}>
            <List className={classes.list}>
              {ingredients.map((ingredient) => (
                <ListItem key={ingredient}>
                  <ListItemText primary={ingredient}></ListItemText>/
                </ListItem>
              ))}
            </List>
          </CardContent>
          <CardContent>
            <Typography>{ingredients}</Typography>
          </CardContent>
        </Collapse>
      </Card>

      <Card>
        <CardActions onClick={handleClick}>
          <CardContent>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>{title}</TableCell>
                    <TableCell align="right">Label</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nutrients.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.label}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.unit}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </CardActions>
      </Card>
    </ReactCardFlip>
  );
}
