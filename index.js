// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const url = 'https://whois.fdnd.nl/api/v1/squad/'

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the public directory
app.use(express.static("public"));

// Create a route for the index page
app.get('/', function (request, response) {

  let slug = request.query.squad || 'squad-a-2022'
  let orderBy = request.query.orderBy || 'name' + '&direction=ASC'
  let squadUrl = url + slug + '?orderBy=' + orderBy + '&direction=ASC'

  fetchJson(squadUrl).then((data) => {
    response.render('index', data)
  })
});

app.post('/', function (request, response) {
  console.log(request.body)
  const payload = {
    id: request.body.id,
    like: request.body.like
  }
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  };
  const url = 'https://whois.fdnd.nl/api/v1/shout'

  fetchJson(url, headers).then((data) => {
    response.redirect(303, '/')
  })
})

// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application available on: http://localhost:${port}`);
});

async function fetchJson(url, payload) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error)
}