// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3030;
const server = app.listen(port, listening);
 function listening(){
    // console.log(server);
    console.log(`The server is running on localhost: ${port}`);
  };


// GET route setup on the server file to return the projectData object .
  app.get("/getData", (req,res)=> {
    res.send(projectData)
  });

  
  // Post Route TO Receive Data
  app.post("/receiveData", (req, res)=>{
    projectData = {...req.body}
    res.send()
  });
  
