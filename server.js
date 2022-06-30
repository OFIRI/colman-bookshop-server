// grab the main Express module from the Express.js package
// this module is a function 
const express = require('express'); 

// we run the function to create our app variable
// it gives us an option to create multiple apps this way, each with it's own requests and responses
const app = express();

// tell our Express server how to handle a GET request
// the function takes two main parameters: 
// 1) URL (in this case, we are targeting '/' which is the root of our website)
// 2) a function with two args: req, res.
//      req - represents the request that was sent to the server
//      res - represents the response that we'll send back to the client
app.get('/', (req, res) => {
    res.send('Successful response.')
});

// we are passing 3000 into the listen function, which tells the app which port to listen on
app.listen(3000, () => console.log('Example app is listening in port 3000.'));