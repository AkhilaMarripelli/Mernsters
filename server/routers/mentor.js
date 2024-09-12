const express = require('express');
//express woutes setup
const router = express.Router();
//importing controller
const {signupMentor,loginMentor} = require('./../controllers/mentorController')

//signup user
router.post('/signup',signupMentor)

//login user
router.post('/login',loginMentor)

module.exports = router;