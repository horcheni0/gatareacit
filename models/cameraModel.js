const mongoose = require("mongoose");

const cameraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
    unique: true,
  },
  location: String,
});

const Camera = mongoose.model("Camera", cameraSchema);

module.exports = Camera;
