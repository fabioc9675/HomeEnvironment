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

// ***************************************************************
// ****** Additional routes to get data **************************
// ***************************************************************

// reading data by id
router.get("/id/:id", async (req, res) => {
  // make a request to the database
  const monitorObj = await Monitor.findById(req.params.id);
  // when client ask for '/' server response
  res.json(monitorObj);
});

// reading last data by place
router.get("/last/place/:place", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:5000/api/monitoring/last/place/FABIAN
  const place = req.params.place;
  const monitorObj = await Monitor.find({ place: place })
    .limit(1)
    .sort({ $natural: -1 });
  res.json(monitorObj);
});

// reading data by typeDat
router.get("/place/:place/typeDat/:typeDat", async (req, res) => {
  // make a request to the database
  // Examples
  // http://localhost:5000/api/monitoring/place/FABIAN/typeDat/EVENT
  const place = req.params.place;
  const typeDat = req.params.typeDat;
  const monitorObj = await Monitor.find({
    place: place,
    typeDat: typeDat,
  }).sort({ createdAt: 1 });
  // response
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
  await monitorObj.save();
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
