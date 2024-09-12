require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const Slot = require('./models/slotModel');
const menteeRoutes = require('./routers/mentee');

// Import routes
const userRoutes = require('./routers/user');
// const sessionRoutes = require('./routers/sessionRoutes'); // Ensure this matches your actual file name

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/user', userRoutes);
// app.use('/api/session', sessionRoutes); // Ensure this matches your session routes

// Save slot
app.post('/api/saveslot', async (req, res) => {
    const { date, startTime, endTime, topic, status, email } = req.body;

    try {
        const newSlot = new Slot({
            date,
            startTime,
            endTime,
            topic,
            status,
            email, // Store the mentor ID here
        });

        const savedSlot = await newSlot.save();

        res.status(201).json({ success: true, message: 'Slot saved successfully!', sessionId: savedSlot.sessionId });
    } catch (error) {
        console.error('Error saving slot:', error);
        res.status(500).json({ error: 'Error saving slot' });
    }
});

// Get sessions
app.get('/api/mysessions', async (req, res) => {
    const { email } = req.query;

    try {
        const sessions = await Slot.find({ email });
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Error fetching sessions' });
    }
});

// Update session by ID
app.put('/api/updatesession/:sessionId', async (req, res) => {
    console.log('entered',req.params)
    const { sessionId } = req.params;
    const updates = req.body;

    try {
        const session = await Slot.findOne({ sessionId });
        console.log('session',session)
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }
        const {email}=req.query;
        // Ensure the session belongs to the current user
        if (session.email !== email) { // Assuming email is sent in the request body
            return res.status(403).json({ message: 'Unauthorized to update this session' });
        }

        Object.assign(session, updates);
        await session.save();

        res.status(200).json({ message: 'Session updated successfully', session });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ message: 'An error occurred while updating the session.' });
    }
});

// Delete session by ID
app.delete('/api/deletesession/:sessionId', async (req, res) => {
    console.log('entered', req.params);
    const { sessionId } = req.params;

    try {
        // Find the session by sessionId
        const session = await Slot.findOne({ sessionId });
        console.log('session', session);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Get the email from query parameters
        const { email } = req.query;

        // Ensure the session belongs to the current user
        if (session.email !== email) { // Ensure email is sent in query parameters
            return res.status(403).json({ message: 'Unauthorized to delete this session' });
        }

        // Delete the session
        await Slot.deleteOne({sessionId });

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ message: 'An error occurred while deleting the session.' });
    }
});

app.use('/api/mentee',menteeRoutes)
app.get('/api/allmentors', async (req, res) => {
    try {
        const mentors = await mentors.find(); // Fetch all mentor documents from the database
        res.status(200).json({ mentors });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ message: 'An error occurred while fetching mentors.' });
    }
});
// Connect to DB
mongoose.connect('mongodb://localhost:27017/profilemanagement', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(port, () => {
            console.log(`Database connected & app listening on port ${port}!`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
