import express from 'express'; 
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { database } from './config/db.js';

// middleware for cors. enable *All* CORS Requests
app.use(cors());

// middleare for bodyparsing using url encoding and json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// connect to mongodb using mongoose
mongoose.connect(database, { useNewUrlParser: true});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// tell our Express server how to handle a GET request
// will change to routes later
app.get('/', (req, res) => {
    res.send('Successful response.')
});

// Decalre port
const PORT = 3000;

// we are passing the port into the listen function, which tells the app which port to listen on
app.listen(PORT, () => console.log(`Server ready to listen at port ${PORT}`));