const express = require('express')
const {
  getmsg,
  createmsg,
  deletemsg
} = require('../controllers/messagetoadminController')

const router = express.Router()
// GET all events
router.get('/', getmsg)

// GET a single event
//router.get('/:id', getEvent)

// POST event
router.post('/', createmsg)

// DELETE event
router.delete('/:id', deletemsg)

// UPDATE event
//router.patch('/:id', updateEvent)

module.exports = router

