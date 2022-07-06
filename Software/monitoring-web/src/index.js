const express = require("express");
const app = express(); // server

// URI connection
const port = process.env.PORT || 5000;

// Settings
app.set("port", port); // takes the port provided for the server or other

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
}); // Helps to handle CORS issues

app.use((req, res, next) => {
  res.send("Welcome to Express");
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
