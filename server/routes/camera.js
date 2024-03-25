const express = require('express')
const {
    getCameraFeed,
    createCamera
} = require('../controllers/cameraController')
const router = express.Router()
// GET stream
router.get('/', getCameraFeed)
// Add camera
router.post('/', createCamera)

module.exports = router

