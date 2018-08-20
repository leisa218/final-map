
const api = "https://api.darksky.net/forecast/5d3f7bd96c2899293cf99631ce645168"

// REMEMBER this forever!!
// This is how to set up CORS Header correctly
const headers = {
  'Accept': 'application/json',
  "Content-Type": "application/json",
  'Access-Control-Allow-Origin': '*'
}

export const get = (weather) =>
  fetch(`${api}`, {mode: 'cors', headers: {headers}, credentials: 'same-origin'})
    .then(res => res.json())
    .then(data => data)

// this is the api call
export const getAll = (lat, lng) =>
  fetch(`${api}/${lat},${lng}?units=auto`, {mode: 'cors', headers: {headers}, credentials: 'same-origin'})
    .then(res => res.json())
    .then(data => data);



export const search = (query) =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  }).then(res => res.json())
    .then(data => data.books)
