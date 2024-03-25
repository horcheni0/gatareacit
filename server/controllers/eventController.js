const Event = require('../models/eventModel')
const mongoose = require('mongoose')
// get all events
const getEvents = async (req, res) => {
  const user_id = req.user._id
  const events = await Event.find({user_id}).sort({createdAt: -1})

  res.status(200).json(events)
}
// get a single event
const getEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such event'})
  }
  const event = await Event.findById(id)

  if (!event) {
    return res.status(404).json({error: 'No such event'})
  }

  res.status(200).json(event)
}
// create a new event
const createEvent = async (req, res) => {
  const {name,location,start,end,logo} = req.body
  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (!location) {
    emptyFields.push('location')
  }
  if (!start) {
    emptyFields.push('start')
  }
  if (!end) {
    emptyFields.push('end')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }
  // add to the database
  try {
    const user_id = req.user._id
    const event = await Event.create({ name,location,start,end,logo,user_id })
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
// delete event
const deleteEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such event'})
  }

  const event = await Event.findOneAndDelete({_id: id})

  if(!event) {
    return res.status(400).json({error: 'No such event'})
  }

  res.status(200).json(event)
}
// update an event
const updateEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such event'})
  }
  const event = await Event.findById(id)
  if (!event) {
    return res.status(400).json({error: 'No such event'})
  }
  const { name, location, start, end } = req.body
  if (!name && !location && !start && !end) {
    return res.status(400).json({ error: 'Please provide at least one field to update' })
  }
  const updatedEvent = await Event.findByIdAndUpdate(
    id,
    { name, location, start, end},
    { new: true }
  )
  res.status(200).json(updatedEvent)
}
module.exports = {
  getEvents,
  getEvent,
  createEvent,
  deleteEvent,
  updateEvent
}