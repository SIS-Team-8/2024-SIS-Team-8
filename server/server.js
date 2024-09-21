require('dotenv').config();
svConfig = require('../config/server.json');
gblConfig = require('../config/global.json');

//const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose');
const app = express(); // create express app

const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
//const mongoRouter = require('./routes/MongoRoute');

// Connect to MongoDB server using environment variables
const mogoURI = process.env.MONGODB_URI;

mongoose.connect(mogoURI, {
    dbName: process.env.MONGODB_DB,
}).then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));;

// // start express server
app.listen(svConfig.server.port, () => {
  console.log("server started on port " + svConfig.server.port);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],                  // update to live site
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // For JSON request bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded request bodies
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, ".." , "client", "build")));
//app.use(express.static("public"));


// app.get("/", (req, res) => {
//   res.send("This is from express.js");
// });

app.use('/', authRoute);

// handle react app routing
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, ".." , "client", "build", "index.html"));
// });