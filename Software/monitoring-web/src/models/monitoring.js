const mongoose = require("mongoose");
const { Schema } = mongoose;

// data scheme to save data into the database
const MonitoringScheme = new Schema(
  {
    place: { type: String, required: true },
    monitor: { type: Number, required: true },
    typeDat: { type: String, required: true },
    temp_env: { type: Number, default: 0 },
    mois_env: { type: Number, default: 0 },
    noise_env: { type: Number, default: 0 },
    distance: { type: Array, default: [0, 0] },
    nPerson: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

// how can I use the schema as a model
module.exports = mongoose.model("monitor", MonitoringScheme); // Label must be tha same as name collection in MongoDB Atlas
