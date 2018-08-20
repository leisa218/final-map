
const api = "https://api.darksky.net/forecast/5d3f7bd96c2899293cf99631ce645168"

const weatherApiKey = 'PBz3vEhQfwVATqFQpyitf8dMPpCx78'


const headers = {
  'Accept': 'application/json',
  "Access-Control-Allow-Origin": "*"
}

export const get = (weather) =>
  fetch(`${api}`, {mode: 'no-cors', headers: {headers}, credentials: 'same-origin'})
    .then(res => res.json())
    .then(data => data)

export const getAll = (lat, lng) =>
  fetch(`${api}/${lat},${lng}?units=auto`, { headers })
    .then(res => res.json())
    .then(data => data)

export const update = (book, shelf) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json())

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
