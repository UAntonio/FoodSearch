/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query

exports.handler = (event, context) => {
  console.log('Function `favorites-read-all` invoked')
  /* configure faunaDB Client with our secret */
  const client = new faunadb.Client({
    secret: process.env.FAUNADB_SERVER_SECRET
  }) 

    /* parse the string body into a useable JS object */
    const uid = JSON.parse(event.body)
    console.log('Function `favorites-read-all` invoked', uid)
  

  return client.query(q.Paginate(q.Match(q.Index('userFavorites'),uid)))
    .then((response) => {
      const favoriteRefs = response.data
      console.log('User Favorite refs', favoriteRefs)
      console.log(`${favoriteRefs.length} favorites found`)
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllFavoriteDataQuery = favoriteRefs.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllFavoriteDataQuery).then((ret) => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
