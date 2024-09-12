require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const Slot = require('./models/slotModel'); // Adjust the path as needed


const userRoutes = require('./routers/user');
// const slotRoutes = require('./routers/slotRoutes'); // Ensure this matches the exact file name

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/user', userRoutes);
// app.use('/api/session', sessionRoutes); // Use the correct route for sessions
// app.use('/api/slot', slotRoutes); // Ensure this matches your slot routes
app.post('/api/saveslot', async (req, res) => {
    console.log('entered');
    const { date, startTime, endTime, topic, status, email } = req.body;
    console.log(date, startTime, endTime, topic, status, email )
    try {
      const newSlot = new Slot({
        date,
        startTime,
        endTime,
        topic,
        status,
        email, // Store the mentor ID here
      });
  
      const savedslot=await newSlot.save();
  
      res.status(201).json({ success: true, message: 'Slot saved successfully!' });
      sessionId: savedslot.sessionId
    } catch (error) {
      console.error('Error saving slot:', error);
      res.status(500).json({ error: 'Error saving slot' });
    }
  });
  app.get('/api/mysessions', async (req, res) => {
    const { email } = req.query; // Get mentorId from query parameters

    try {
        const sessions = await Slot.find({ email });
        res.status(200).json({ success: true, sessions });
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ error: 'Error fetching sessions' });
    }
});
// Update session by ID
app.put('/updatesession/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    const updates = req.body;

    try {
        const session = await Slot.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Ensure the session belongs to the current user
        if (session.email !== req.user.email) {
            return res.status(403).json({ message: 'Unauthorized to update this session' });
        }

        Object.assign(session, updates); // Merge updates with the session object
        await session.save();

        res.status(200).json({ message: 'Session updated successfully', session });
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({ message: 'An error occurred while updating the session.', error: error.message });
    }
});


app.delete('/deletesession/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    try {
        const session = await Slot.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        // Ensure the session belongs to the current user
        if (session.email !== req.user.email) {
            return res.status(403).json({ message: 'Unauthorized to delete this session' });
        }

        await session.remove();

        res.status(200).json({ message: 'Session deleted successfully' });
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({ message: 'An error occurred while deleting the session.' });
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
