require('dotenv').config();
svConfig = require('./config/server.json');
gblConfig = require('./config/global.json');

const path = require("path");
const express = require("express");
const app = express(); // create express app

const mongoRouter = require('./routes/mongoRoute');

app.use(express.static(path.join(__dirname, "client", "build")));
app.use(express.static("public"));

app.use(express.json()); // For JSON request bodies
app.use(express.urlencoded({ extended: true })); // For URL-encoded request bodies



// app.get("/", (req, res) => {
//   res.send("This is from express.js");
// });

app.use('/db', mongoRouter);

// handle react app routing
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// start express server
app.listen(svConfig.server.port, () => {
  console.log("server started on port " + svConfig.server.port);
});