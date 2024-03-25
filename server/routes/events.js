const express = require('express')
const {
  getEvents, 
  getEvent, 
  createEvent, 
  deleteEvent, 
  updateEvent
} = require('../controllers/eventController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()
router.use(requireAuth)
// GET all events
router.get('/', getEvents)

// GET a single event
router.get('/:id', getEvent)

// POST event
router.post('/', createEvent)

// DELETE event
router.delete('/:id', deleteEvent)

// UPDATE event
router.patch('/:id', updateEvent)

module.exports = router

