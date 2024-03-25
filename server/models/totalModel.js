const mongoose = require('mongoose');

const totalSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  f_total:{
    type: Number,
    required: true,
  },
  m_total :{
    type: Number,
    required: true,
  },
  emotion :{
    type:String,
    required:true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
    get: function (val) {
      return new Date(val).toISOString();
    },
    set: function (val) {
      return new Date(val).toISOString();
    },
  },
});

module.exports = mongoose.model('Total', totalSchema);

