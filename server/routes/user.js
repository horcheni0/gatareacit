const express = require('express')
const requireAuth = require('../middleware/requireAuth.js')
const router = express.Router()
const {signupUser,loginUser,getUsers,resetPassword,getUsersByEmail,getUserByName ,changeUserProfile,getUserProfile} =  require('../controllers/userController')
// Route de réinitialisation du mot de passe
router.post('/reset-password', resetPassword);
//login route
router.post('/login',loginUser)

//signup route
router.post('/signup',signupUser)

//get users
router.get('/',getUsers)

//get usersby email
 
router.get('/email/:email',getUsersByEmail)

// Get user profile
router.get('/profile/:userId',getUserProfile)
// Get user by name
router.get('/:name',getUserByName)


//change user profile
router.patch('/profile/:userId',changeUserProfile,requireAuth)

module.exports = router 