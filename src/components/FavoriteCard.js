import { Card, CardContent, Button, Grid} from "@material-ui/core";
import React, { useState } from "react";
import api from "../utils/api";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";

import {
  IconButton,
  Typography,
  CardHeader,
  CardActions,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  link: {
    marginLeft: 'auto',

  },

}));

export default function FavoriteCard(props) {
  const { favorite } = props;
  const { favorites } = props;
  const { setFavorites } = props;
  const [commentValue, setCommentValue] = useState(favorite.data.comment);
  const [editing, setEditing] = useState(false);
  const id = getFavoriteId(favorite);
  const classes = useStyles();

  const saveFavorite = async (event) => {
    let isDifferent = false;
    const favoriteId = id;

    const updatedFavorites = favorites.map((favorite) => {
      const id = getFavoriteId(favorite);
      if (id === favoriteId && favorite.data.comment !== commentValue) {
        favorite.data.comment = commentValue;
        isDifferent = true;
      }
      return favorite;
    });

    // only set state if input different
    if (isDifferent) {
      setFavorites(updatedFavorites);
      api
        .update(favoriteId, {
          comment: commentValue,
        })
        .then(() => {
          console.log(`update favorite ${favoriteId}`, commentValue);
          setEditing(false);
        })
        .catch((e) => {
          console.log("An API error occurred", e);
        });
    }
  };

  const updateEdit = async (e) => {
    setEditing(!editing);
  };

  const deleteFavorite = async (e) => {
    const favoriteId = id;
    // Optimistically remove Favorite from UI
    const filteredFavorites = favorites.reduce(
      (acc, current) => {
        const currentId = getFavoriteId(current);
        if (currentId === favoriteId) {
          // save item being removed for rollback
          acc.rollbackFavorite = current;
          return acc;
        }
        // filter deleted Favorite out of the favorites list
        acc.optimisticState = acc.optimisticState.concat(current);
        return acc;
      },
      {
        rollbackTodo: {},
        optimisticState: [],
      }
    );

    setFavorites(filteredFavorites.optimisticState);

    // Make API request to delete Favorite
    api
      .delete(favoriteId)
      .then(() => {
        console.log(`deleted favorite id ${favoriteId}`);
      })
      .catch((e) => {
        console.log(`There was an error removing ${favoriteId}`, e);
        // Add item removed back to list
        setFavorites(
          filteredFavorites.optimisticState.concat(
            filteredFavorites.rollbackFavorite
          )
        );
      });
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  function getFavoriteId(favorite) {
    if (!favorite.ref) {
      return null;
    }
    return favorite.ref["@ref"].id;
  }

  return (
    <Container>
      <Card>
        <CardHeader
          title={favorite.data.title}
          action={
            editing ? (
              <Button
                variant="contained"
                color="primary"
                onClick={saveFavorite}
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={updateEdit}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            )
          }
        />
        <CardContent>
          {editing ? (
            <TextField
              id="outlined-textarea"
              label="Comment"
              onChange={handleCommentChange}
              value={commentValue}
              multiline
              variant="outlined"
            />
          ) : (
            <Typography>{favorite.data.comment}</Typography>
          )}
        </CardContent>
        <CardActions disableSpacing>
        <Grid
  container
  direction="row"
  justify = "space-between"
  alignContent = "space-between"
>
          <Button
            variant="contained"
            color="primary"
            onClick={deleteFavorite}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>

          <Button
          classes = {classes.link}
            variant="contained"
            color="primary"
            href={favorite.data.link} 
            target="_blank"
            startIcon={<LinkIcon />}
          >
            Instructions
          </Button>
          </Grid>

        </CardActions>
      </Card>
    </Container>
  );
}
