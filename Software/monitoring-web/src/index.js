const express = require("express");
const path = require("path");
const app = express(); // server
const mongoose = require("mongoose");
require("dotenv").config();

// URI connection
const URI = process.env.REACT_APP_URI; // Environment variable
const port = process.env.PORT || 5000;
const connection = mongoose.connection;

// Socket setup
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

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
app.use(express.static(path.join(__dirname, "../frontend/build"))); // adding prefix to the route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html")); // Heroku creates the build for us
});

// Connect to the database
mongoose
  .connect(URI) // create connection to mongodb database
  .then((db) => console.log("Database is connected"))
  .catch((err) => console.error(err));

// Socket initialization
io.on("connection", (socket) => {
  console.log("socket.io: User connected: ", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected: ", socket.id);
  });
});

// Starting the server
server.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// initialization of collection watch
connection.once("open", () => {
  console.log("MongoDB database connected");

  // Setting change streams in the database
  console.log("Setting change streaming");
  const monitoringChangeStream = connection.collection("monitors").watch();

  // Handle the event on change
  monitoringChangeStream.on("change", (change) => {
    switch (change.operationType) {
      case "insert":
        console.log("data inserted");
        io.emit("notify", `notification from ${change.fullDocument._id}`);
    }
  });
});
