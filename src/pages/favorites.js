import React, { useEffect, useState } from "react"
import api from "../utils/api"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import FavoriteCard from "../components/FavoriteCard"

export default function FavoritesPage(props) {
  const [favorites, setFavorites] = useState([])
  const {user}  = props; 

  const getFavorites = async () => {
    
    api.readAll(user.uid).then((favorites) => {
      if (favorites.message === "unauthorized") {
        return false
      }

      console.log("all favorites", favorites)
      setFavorites(favorites)
    })
  }


  useEffect(() => {
    getFavorites()
  }, )

  return (
    <Container>
      <Grid container spacing={2} alignItems="stretch">
        {favorites.map((favorite, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={3} key = {index}>
            <FavoriteCard  favorite = {favorite}
            favorites = {favorites}
            setFavorites = {setFavorites}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
