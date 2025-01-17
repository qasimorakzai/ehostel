// routes/beds.js
const express = require('express');
const router = express.Router();
const Bed = require('../models/Bed');
const Room = require('../models/room');
const authenticate =require("../middleware/auth");


router.use(authenticate);
// Add Bed Form
router.get('/add', async (req, res) => {
    const rooms = await Room.find();
    res.render('beds/addBed', { rooms });
});

// Create Bed
router.post('/', async (req, res) => {
    const { bedTitle, bedNumber, room, bedStatus, remarks } = req.body;
    
    // Find the selected room to get the rent and security amount
    const selectedRoom = await Room.findById(room);
    
    const newBed = new Bed({
        bedTitle,
        bedNumber,
        room,
        bedStatus,
        remarks,
    });

    await newBed.save();
    res.redirect('/beds');
});

// Display All Beds
router.get('/', async (req, res) => {
    const beds = await Bed.find().populate('room');
    res.render('beds/showBeds', { beds });
});

// Edit Bed Form
router.get('/edit/:id', async (req, res) => {
    const bed = await Bed.findById(req.params.id).populate('room');
    const rooms = await Room.find();
    res.render('beds/editBed', { bed, rooms });
});

// Update Bed
router.post('/edit/:id', async (req, res) => {
    const { bedTitle, bedNumber, room, bedStatus, remarks } = req.body;
    
    // Find the selected room to get the rent and security amount
    const selectedRoom = await Room.findById(room);
    
    await Bed.findByIdAndUpdate(req.params.id, {
        bedTitle,
        bedNumber,
        room,
        bedStatus,
        remarks,
    });

    res.redirect('/beds');
});

// Delete Bed
router.post('/delete/:id', async (req, res) => {
    await Bed.findByIdAndDelete(req.params.id);
    res.redirect('/beds');
});

module.exports = router;
