import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ReactCardFlip from "react-card-flip";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 10,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignitems: "center",
    minwWidth: "40%",
  },
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
  expandOpen: {
    transform: "rotate(180deg)",
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 200,
  },
  recipe:{
    borderRadius: 10,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignitems: "center",
    minwWidth: "40%",
},
image:{
    borderRadius: "50%",
    width: 100,
    height: 100,

},
dietLabels:{
    height: 60,

},
ingredients:{
    width: "80%",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
},
caloriesCard:{

}

}));

export default function RecipeCard({ title, ingredients, calories, image,totalNutrients }) {
  const classes = useStyles();

  const [isFlipped, setisFlipped] = useState(false);

  const handleClick = () => {
    setisFlipped(!isFlipped);
  };

  var nutrients = [];
for(var NutrientsKey in totalNutrients){
    if(totalNutrients.hasOwnProperty(NutrientsKey)){
        nutrients.push(totalNutrients[NutrientsKey]);
    }
}
  //remove duplicate data and add numbers

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card className={classes.root}>
        <CardHeader title={title} subheader="subheader" />{" "}
        <CardActions onClick={handleClick}>
          <CardContent className={classes.ingredients}>
            <List className={classes.list}>
              {ingredients.map((ingredient) => (
                <ListItem key={ingredient}>
                  <ListItemText primary={ingredient.text}></ListItemText>/
                </ListItem>
              ))}
            </List>
            <Typography>{calories}</Typography>
            <Avatar src={image} />
          </CardContent>
        </CardActions>
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
