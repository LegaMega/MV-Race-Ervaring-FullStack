require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Drop existing collections and recreate schema
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async () => {
    console.log('MongoDB connected!');
    console.log('Using database:', mongoose.connection.db.databaseName);
})
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Define Event Schema with strict validation
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: String, required: true },
    location: { 
        type: String, 
        required: true,
        default: '',
        trim: true
    },
    description: { type: String, default: '' },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: true,
    strict: true
});

// Create model
const Event = mongoose.model('Event', eventSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: error.message });
    }
});

// Create new event
app.post('/api/events', async (req, res) => {
    try {
        console.log('Received data:', req.body);
        
        // Create new event with explicit location
        const eventData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            date: req.body.date,
            location: req.body.location,
            description: req.body.description
        };

        console.log('Creating event with data:', eventData);
        
        // Create and save event
        const event = new Event(eventData);
        const savedEvent = await event.save();
        
        console.log('Saved event:', savedEvent.toObject());
        
        // Verify the saved data
        const verifiedEvent = await Event.findById(savedEvent._id);
        console.log('Verified event from database:', verifiedEvent.toObject());
        
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete event
app.delete('/api/events/:id', async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: 'Event deleted' });
    } catch (error) {
        console.error('Error deleting event:', error);
        res.status(500).json({ message: error.message });
    }
});

// Update event
app.put('/api/events/:id', async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEvent);
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(400).json({ message: error.message });
    }
});

app.listen(3001, () => console.log('Server running on http://localhost:3001')); 