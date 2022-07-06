const express = require("express");
const router = express.Router();

// import Schema
const Monitor = require("../models/monitoring");

// reading data from database
router.get("/", async (req, res, next) => {
  // make a request for the database
  const monitorObj = await Monitor.find();
  // when client ask for '/' server response
  res.json(monitorObj);
});

// Posting data into database  // {'place': 'FABIAN', 'monitor': 1, 'typeDat': 'SAMPLE', 'temp_env': 24.0, 'mois_env': 46.0, 'noise_env': 430.2, 'distance': [17.0, 23.8], 'nPerson': 2}
router.post("/", async (req, res, next) => {
  // make a posting to the database
  const {
    place,
    monitor,
    typeDat,
    temp_env,
    mois_env,
    noise_env,
    distance,
    nPerson,
  } = req.body; // create an object from the body of the POST request
  const monitorObj = new Monitor({
    place,
    monitor,
    typeDat,
    temp_env,
    mois_env,
    noise_env,
    distance,
    nPerson,
  });
  console.log(monitorObj);
  // Post the data
  await Monitor.save();
  res.json({ status: "Monitoring Data Recorded" });
});

// Updating data into the database
router.put("/id/:id", async (req, res, next) => {
  // make an update into the database
  const {
    place,
    monitor,
    typeDat,
    temp_env,
    mois_env,
    noise_env,
    distance,
    nPerson,
  } = req.body; // create an object from the body of the POST request
  const monitorObj = {
    place,
    monitor,
    typeDat,
    temp_env,
    mois_env,
    noise_env,
    distance,
    nPerson,
  };
  // Update the data
  await Monitor.findByIdAndUpdate(req.params.id, monitorObj);
  res.json({ status: "Monitoring Data Modified" });
});

// Deleting data in the database
router.delete("/id/:id", async (req, res) => {
  // Make a delete of data into the database
  await Monitor.findByIdAndRemove(req.params.id);
  res.json({ status: "Monitoring Data Deleted" });
});

module.exports = router;
