require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const Slot = require('./models/slotModel');
const menteeRoutes = require('./routers/mentee');
const Mentor=require('./models/userModel');
const menteeModel = require('./models/menteeModel');
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
    console.log('enterd to all mentors')
    try {
        const mentors = await Mentor.find(); // Fetch all mentor documents from the database
        res.status(200).json({ mentors });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ message: 'An error occurred while fetching mentors.' });
    }
});
// Get mentee data by email
app.get('api/allmentees/:email', async (req, res) => {
    console.log('Entered to fetch mentee by email');
    try {
        const { email } = req.params;
        const mentee = await Mentee.findOne({ email });

        if (!mentee) {
            return res.status(404).json({ message: 'Mentee not found' });
        }

        res.status(200).json(mentee);
    } catch (error) {
        console.error('Error fetching mentee:', error);
        res.status(500).json({ message: 'An error occurred while fetching the mentee.' });
    }
});

app.get('/api/allsessions', async (req, res) => {
    try {
        const sessions = await Slot.find().sort({ date: -1 });

        // Log sessions to ensure they are being fetched
        console.log("Fetched sessions:", sessions);

        const emails = sessions.map(session => session.email);
        const mentors = await Mentor.find({ email: { $in: emails } });

        // Log mentors to ensure correct fetching
        console.log("Fetched mentors:", mentors);

        const mentorMap = mentors.reduce((map, mentor) => {
            map[mentor.email] = mentor;
            return map;
        }, {});

        // Map sessions to include mentor details
        const sessionsWithDetails = sessions.map((session) => {
            const mentor = mentorMap[session.email] || {};
            return {
                sessionId: session.sessionId,
                topic: session.topic,
                date: session.date,
                startTime: session.startTime,
                endTime: session.endTime,
                status: session.status,
                name: mentor.name || 'N/A',
                bio: mentor.profile?.bio || 'N/A',
                expertise: mentor.profile?.expertise || []
            };
        });

        // Log the final session data
        console.log("Sessions with details:", sessionsWithDetails);

        res.status(200).json(sessionsWithDetails);
    } catch (error) {
        console.error('Error fetching sessions:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


app.post('/api/book-slot', async (req, res) => {
    try {
        console.log('entered book slot')
      const { sessionId, email } = req.body;
        console.log(sessionId,email)
      // Find the slot by sessionId
      const slot = await Slot.findOne({ sessionId });
        console.log(slot)
      if (!slot) {
        return res.status(404).json({ message: 'Slot not found' });
      }
  
      // Check if the slot is already booked
      if (slot.status === 'booked') {
        return res.status(400).json({ message: 'Slot already booked' });
      }
  
      // Update the slot with mentee's email and change status to 'booked'
      slot.menteeemail = email; // Store the mentee's email
      slot.status = 'booked';   // Update the status to 'booked'
      await slot.save();
  
      res.status(200).json({ message: 'Slot booked successfully!' });
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  app.get('/api/allmentees/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const mentee = await menteeModel.findOne({ email }); // Fetch the mentee by email
        if (!mentee) {
            return res.status(404).json({ message: 'Mentee not found' });
        }
        res.status(200).json(mentee); // Respond with the mentee data
    } catch (error) {
        console.error('Error fetching mentee:', error);
        res.status(500).json({ message: 'An error occurred while fetching mentee.' });
    }
});
  // Get sessions for a mentee categorized by status (booked and completed)
app.get('/api/mentee/:menteeemail/sessions', async (req, res) => {
    const { menteeemail } = req.params;
    console.log(menteeemail)
    try {
      // Find booked sessions for the mentee
      const bookedSessions = await Slot.find({
        menteeemail,
        status: 'booked', // Assuming 'booked' status indicates active sessions
      });
      console.log(bookedSessions)
      // Find completed sessions for the mentee
      const completedSessions = await Slot.find({
        menteeemail,
        status: 'completed', // Assuming 'completed' status indicates finished sessions
      });
  
      // Return the categorized sessions in the response
      res.json({
        bookedSessions,
        completedSessions,
      });
    } catch (error) {
      console.error('Error fetching mentee sessions:', error);
      res.status(500).json({ message: 'Failed to fetch mentee sessions' });
    }
  });
  app.get('/api/mentor/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      // Fetch mentor details by email
      const mentor = await Mentor.findOne({ email }).exec();
      if (!mentor) {
        return res.status(404).json({ message: 'Mentor not found' });
      }
  
      // Fetch sessions for the mentor by email
      const sessions = await Slot.find({ email: email }).exec(); // Assuming mentorEmail field in Session
  
      res.status(200).json({ mentor, sessions });
    } catch (error) {
      console.error('Error fetching mentor details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  app.get('/api/mentor/:email/sessions', async (req, res) => {
    const { email } = req.params;
  
    try {
      // Find booked sessions for the mentee
      const bookedSessions = await Slot.find({
        email,
        status: 'booked', // Assuming 'booked' status indicates active sessions
      });
  
      // Find completed sessions for the mentee
      const completedSessions = await Slot.find({
        email,
        status: 'completed', // Assuming 'completed' status indicates finished sessions
      });
  
      // Return the categorized sessions in the response
      res.json({
        bookedSessions,
        completedSessions,
      });
    } catch (error) {
      console.error('Error fetching mentee sessions:', error);
      res.status(500).json({ message: 'Failed to fetch mentee sessions' });
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
