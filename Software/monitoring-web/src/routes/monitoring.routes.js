const express = require("express");
const router = express.Router();

// reading data from database
router.get("/", async (req, res, next) => {
  // make a request for the database
});

// Posting data into database
router.post("/", async (req, res, next) => {
  // make a posting to the database
});

// Updating data into the database
router.put("/id/:id", async (req, res, next) => {
  // make an update into the database
});

// Deleting data in the database
router.delete("/id/:id", async (req, res) => {
  // Make a delete of data into the database
});

module.exports = router;
