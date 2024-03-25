const Msg = require('../models/messagetoadmin')
const mongoose = require('mongoose')
// get all events
const getmsg = async (req, res) => {
  const msg = await Event.find({}).sort({createdAt: -1})
  res.status(200).json(msg)
}

// create a message to admin
const createmsg = async (req, res) => {
  const {fullname,email,message,number} = req.body
  let emptyFields = []

  if (!fullname) {
    emptyFields.push('fullname')
  }
  if (!email) {
    emptyFields.push('email')
  }
  if (!message) {
    emptyFields.push('message')
  }
  if (!number) {
    emptyFields.push('number')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
  // add to the database
  try {
    const msg = await Msg.create({ fullname, email, message, number })
    res.status(200).json(msg)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// delete event
const deletemsg = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such msg'})
  }
  const msg = await Msg.findOneAndDelete({_id: id})
  if(!msg) {
    return res.status(400).json({error: 'No such msg'})
  }
  res.status(200).json(msg)
}

module.exports = {
  getmsg,
  createmsg,
  deletemsg
}