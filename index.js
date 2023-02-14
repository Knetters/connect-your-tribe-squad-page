// Import the required modules
import express from "express";
import fetch from "node-fetch";

// Create a new Express app
const app = express();

// Set EJS as the template engine and specify the views directory
app.set("view engine", "ejs");
app.set("views", "./views");

// Serve static files from the public directory
app.use(express.static("public"));

// Create a route for the index page
app.get('/', function (req, res) {
  let url = "https://whois.fdnd.nl/api/v1/squad/squad-a-2022"

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data && data.squad && data.squad.members) {
        const members = data.squad.members;
        res.render('index', { members });
      } else {
        res.render('index', { members: [] });
      }
    })
    .catch(error => {
      console.error(error);
      res.render('index', { members: [] });
    });
});

// Set the port number and start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Application available on: http://localhost:${port}`);
});
