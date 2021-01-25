

const fetchRecipes= (query)=>{
  return fetch(`/.netlify/functions/recipes-results/${query}`,{
        method: 'POST'
    }).then((response)=>{
        return response.json()
    })
}

export default{
    fetchRecipes
}