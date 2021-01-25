import axios from "axios"

export async function handler(event, context) {
  try {
    const search = event.queryStringParameters.query;
    const response = await axios.get(`https://api.edamam.com/search?q=${search}&app_id=${ process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}`,
     { headers: { Accept: "application/json" } })
    const data = response.data
    console.log(data.hits);
    return {
      statusCode: 200,
      body: JSON.stringify({ details: data}) 
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    }
  }
}
