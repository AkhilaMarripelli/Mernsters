const express = require('express');
const router = express.Router();
const { createSession, getAllSessions } = require('../controllers/sessionController');

// Create a session
router.post('/', createSession);

// Get all sessions (example)
router.get('/', getAllSessions);

module.exports = router;
