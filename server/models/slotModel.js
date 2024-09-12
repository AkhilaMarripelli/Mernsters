const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const slotSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        default: uuidv4, // Automatically generate a unique sessionId
        unique: true
    },
    email: {
        type: String,
        required: true,
        ref: 'Mentor'
    },
    date: {
        type: Date,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    topic: {
        type: String,
    },
    status: {
        type: String,
        enum: ['booked', 'active', 'completed'],
        default: 'active',
    },
    menteeemail:{
        type:String,
        default:null
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Slot', slotSchema);
