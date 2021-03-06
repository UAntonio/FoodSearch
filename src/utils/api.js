

const fetchRecipes= (query)=>{
  return fetch(`/.netlify/functions/recipes-results/${query}`,{
        method: 'POST'
    }).then((response)=>{
        return response.json()
    })
}


/* Api methods to call /functions */

const create = (data) => {
  return fetch('/.netlify/functions/favorites-add', {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const readAll = (uid) => {
  return fetch('/.netlify/functions/favorites-read-all',{
    body: JSON.stringify(uid),
    method: 'POST'
  }).then((response) => {
    return response.json()
  })
}

const update = (favoriteId, data) => {
  return fetch(`/.netlify/functions/favorites-update/${favoriteId}`, {
    body: JSON.stringify(data),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}

const deleteFavorite = (favoriteId) => {
  return fetch(`/.netlify/functions/favorites-delete/${favoriteId}`, {
    method: 'POST',
  }).then(response => {
    return response.json()
  })
}

const batchDeleteFavorites = (favoriteIds) => {
  return fetch(`/.netlify/functions/favorites-delete-batch`, {
    body: JSON.stringify({
      ids: favoriteIds
    }),
    method: 'POST'
  }).then(response => {
    return response.json()
  })
}


export default{
    fetchRecipes, 
    create: create,
    readAll: readAll,
    update: update,
    delete: deleteFavorite,
    batchDelete: batchDeleteFavorites
}