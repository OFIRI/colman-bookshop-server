import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import { database } from "./config/db.js";
import init_shops from "./middlewares/init_db/init_shops.js";
import init_users from "./middlewares/init_db/init_users.js";
import books from "./controllers/books.js";
import users from "./controllers/users.js";
import shops from "./controllers/shops.js";
import orders from "./controllers/orders.js";
import cmSketch from "./controllers/count_min_sketch.js";
import scrapper from "./middlewares/init_db/scrapper.js";

// middleware for cors. enable *All* CORS Requests
app.use(cors());

// middleare for bodyparsing using url encoding and json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to mongodb using mongoose
mongoose.connect(database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// init db with starter data
init_shops();
init_users();
// scrapper();

// declare routes
app.use("/users", users);
app.use("/books", books);
app.use("/shops", shops);
app.use("/orders", orders);
app.use("/cmSketch", cmSketch);

const clients =[];

// add a websocket connection
const server = http.createServer(app);
const io = new Server(server, { cors:{
  origin:'*',
  credentials:true
}});
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("sendUser", (id) => {
    clients.push({
      id: id,
      socket: socket.id,
    });
    console.log(clients);
  });

  socket.on("dc", function () {
    var index = clients.find((client, i) => {
      if (client.socket == socket.id) {
        return i;
      }
    });

    clients.splice(index, 1);
    console.log(clients);
    console.log("user disconnected");
  });
});

// Decalring port
const PORT = 5000;

// we are passing the port into listen, which tells the app which port to listen on
server.listen(PORT, () =>
  console.log(`Server ready to listen at port ${PORT}`)
);
