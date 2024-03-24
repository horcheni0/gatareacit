const mongoose = require('mongoose')

const Schema = mongoose.Schema

const frameSchema = new Schema({
  location: {
    type: String,
    required: true
    },
   channel: {
    type: String,
    required: true
  },
  trigger: {
    type: String,
    required: true
  },
   date: {
    type: Date,
    required: true
  },
  type : {
    type: String,
  },
  classification : {
    type: String,
  },
  snapshot : {
    type: String,
  },
  total : {
    type: Number,
  },
})

module.exports = mongoose.model('frames', frameSchema)