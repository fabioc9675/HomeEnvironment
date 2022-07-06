const express = require("express");
const path = require("path");
const app = express(); // server
const mongoose = require("mongoose");
require("dotenv").config();

// URI connection
const URI = process.env.REACT_APP_URI; // Environment variable
const port = process.env.PORT || 5000;
const connection = mongoose.connection;

// Settings
app.set("port", port); // takes the port provided for the server or other

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); // Helps to handle CORS issues

app.use(express.json()); // every data that arrives to the server enters to this and it verifies if the data is a json

// Routes
app.use("/api/monitoring", require("./routes/monitoring.routes")); // adding prefix to the route

// Static files
app.use(express.static(path.join(__dirname, "public"))); // adding prefix to the route

// Connect to the database
mongoose
  .connect(URI) // create connection to mongodb database
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
