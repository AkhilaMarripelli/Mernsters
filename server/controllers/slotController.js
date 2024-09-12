const Slot = require('../models/slotModel');

const createSlot = async (req, res) => {
    const { date, startTime, endTime, topic, status } = req.body;
    // const mentorId = req.user.id; // User ID fetched from middleware
    const mentorId = JSON.parse(localStorage.getItem('user')).id;
    try {
        // Define the slot object with topic and status
        const newSlot = {
            mentorId, // Save mentorId in the slot
            date: new Date(date), // Ensure date is in Date format
            startTime, // Keep time as String
            endTime, // Keep time as String
            topic, // Include topic field
            status: status || 'active', // Default to 'active' if status is not provided
        };

        // Create a new slot entry in the database
        const slot = new Slot(newSlot);
        await slot.save();

        res.json({ success: true, message: 'Slot saved successfully!' });
    } catch (error) {
        console.error('Error saving slot:', error); // Log the error details
        res.status(500).json({ error: 'Error saving slot' });
    }
};

module.exports = { createSlot };
