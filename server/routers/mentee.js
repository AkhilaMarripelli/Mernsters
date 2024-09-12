const express = require('express');
// Express routes setup
const router = express.Router();

// Importing controllers
const { signupUser, loginUser } = require('./../controllers/menteeController');

// Signup user route
router.post('/signup', signupUser);

// Login user route
router.post('/login', loginUser);

module.exports = router;
