const express = require('express');
const router = express.Router();
const Room = require('../models/room');
const Hostel = require('../models/hostel'); // Import the Hostel model
const authenticate = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

router.use(authenticate);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Rename file to include timestamp
    }
});
const upload = multer({ storage: storage });

// Default route for /rooms
router.get('/', (req, res) => {
    res.redirect('/rooms/show');
});

// Show all rooms
router.get('/show', async (req, res) => {
    try {
        const rooms = await Room.find().lean();
        res.render('rooms/showRooms', { rooms });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Show form to add a new room
router.get('/add', async (req, res) => {
    try {
        const hostels = await Hostel.find().lean(); // Fetch the list of hostels
        res.render('rooms/addRoom', { hostels });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new room
router.post('/add', upload.single('attachments'), async (req, res) => {
    try {
        const room = new Room({
            ...req.body,
            attachments: req.file ? req.file.path : undefined // Save file path in attachments
        });
        await room.save();
        res.redirect('/rooms/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Show form to edit a room
router.get('/edit/:id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).lean();
        const hostels = await Hostel.find().lean(); // Fetch the list of hostels
        res.render('rooms/editRoom', { room, hostels });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Edit a room
router.post('/edit/:id', upload.single('attachments'), async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            attachments: req.file ? req.file.path : undefined // Update file path if a new file is uploaded
        };
        await Room.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/rooms/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a room
router.get('/delete/:id', async (req, res) => {
    try {
        await Room.findByIdAndDelete(req.params.id);
        res.redirect('/rooms/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
