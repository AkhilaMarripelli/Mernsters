const express = require('express');
const router = express.Router();
const { createSlot } = require('../controllers/slotController');
// const fetchUser = require('../middleware/fetchUser');

router.post('/saveslot', createSlot);

module.exports = router;
