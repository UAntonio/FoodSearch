import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  CardMedia,
  IconButton,
  Collapse,
  Typography,
  CardHeader,
  CardContent,
  Card,
  CardActions,
  TablePagination,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import api from "../utils/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {},
  expandOpen: {
    transform: "rotate(180deg)",
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

export default function RecipeCard(props) {
  const {
    title,
    ingredients,
    servings,
    calories,
    image,
    totalNutrients,
    link,
    user
  } = props;
  const classes = useStyles();

  const [isFlipped, setisFlipped] = useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const totalCalories = Math.round(calories / servings);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  //Add Numbers to the Ingredients
  var numberedIngredients = ingredients.map(function (value, index) {
    var counter = index + 1;
    return counter + ": " + value.replace("/", "");
  });

  const saveFavorite = (e) => {
    if(!user){
      handleInvalidClick()
      return 
    }
    const userId = user.uid;
    const favoriteInfo = {
      title: title,
      link: link,
      comment: "I like the Recipe!!",
      userId: userId,
    };

    // Make API request to create new todo
    api
      .create(favoriteInfo)
      .then((response) => {
        handleValidFavorites();
        console.log(response);
      })
      .catch((e) => {
        console.log("An API error occurred", e);
      });
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  const [invalidOpen, setInvalidOpen] = useState(false);
  const [validOpen, setValidOpen] = useState(false);

  const handleInvalidClick = () => {
    setInvalidOpen(true);
  };
  const handleValidFavorites =() =>{
    setValidOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setInvalidOpen(false);
    setValidOpen(false);
  };
  return (
    <>
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Card className={classes.root}>
        <CardHeader
          title={title}
          subheader={"Calories: " + totalCalories + "\t Servings: " + servings}
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <Typography>Nutrients</Typography>
              <NavigateNextIcon />
            </IconButton>
          }
        />

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
        <IconButton onClick={saveFavorite}>
          <FavoriteBorderIcon />
        </IconButton>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.ingredients}>
            <List className={classes.list}>
              {numberedIngredients.map((ingredient) => (
                <ListItem key={ingredient}>
                  <ListItemText primary={ingredient}></ListItemText>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Collapse>
      </Card>

      <Card>
        <CardActions onClick={handleClick}>
          <CardHeader title={title} />
        </CardActions>
        <CardContent>
          <Paper>
            <TableContainer component={Paper}>
              <Table
                stickyHeader
                className={classes.table}
                size="small"
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Unit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {nutrients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.name}>
                        <TableCell>{row.label}</TableCell>
                        <TableCell align="right">
                          {Math.round(row.quantity)}
                        </TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 50]}
              component="div"
              count={nutrients.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </CardContent>
      </Card>
    </ReactCardFlip>
    <Snackbar open={validOpen} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success">
    Favorites Has been saved!
  </Alert>
</Snackbar>
<Snackbar open={invalidOpen} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="error">
    Please log in to save favorite details!
  </Alert>
</Snackbar>
    </>
  );
}
