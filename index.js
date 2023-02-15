// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

const url = 'https://whois.fdnd.nl/api/v1/squad/squad-a-2022?orderBy=name&direction=ASC'
const data = await fetch(url)
  .then((response) => response.json())
  .catch((error) => error)

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files from the public directory
app.use(express.static("public"));

// Create a route for the index page
app.get('/', function (request, response) {
  console.log(request.query.squad)

  response.render('index', data)
});

// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application available on: http://localhost:${port}`);
});
