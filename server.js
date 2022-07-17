import express from 'express'; 
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { database } from './config/db.js';
import books from './controllers/books.js';
import users from './controllers/users.js';

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

// declare routes
app.use('/users', users);
app.use('/books', books);

// add a websocket connection
io.on('connection', socket => {
  console.log('user connected');
  socket.on('sendUser', (id)=> {
    clients.push({
      id: id,
      "socket": socket.id
    });
    console.log(clients);
  });
  
  socket.on('disconnect', function(){
    var index = clients.find((client, i) => {
      if (client.socket == socket.id) {
        return i;
      }
    });

    clients.splice(index, 1);
    console.log(clients);
    console.log('user disconnected');
  });
});

// Decalre port
const PORT = 3000;

// we are passing the port into the listen function, which tells the app which port to listen on
app.listen(PORT, () => console.log(`Server ready to listen at port ${PORT}`));