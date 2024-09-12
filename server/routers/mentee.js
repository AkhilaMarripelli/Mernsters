const express = require('express');
//express woutes setup
const router = express.Router();
//importing controller
const {signupMentee,loginMentee} = require('./../controllers/menteeController')

//signup user
router.post('/signup',signupMentee)

//login user
router.post('/login',loginMentee)

module.exports = router;