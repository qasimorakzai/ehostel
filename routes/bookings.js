const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Tenant = require('../models/tenant');
const Room = require('../models/room');
const Bed = require('../models/bed');
const authenticate = require('../middleware/auth');

router.use(authenticate);

// Show all bookings
router.get('/show', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('tenant')
            .populate('room')
            .populate('bed')
            .lean();
        res.render('bookings/showBookings', { bookings });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Show form to add a new booking
router.get('/add', async (req, res) => {
    try {
        const tenants = await Tenant.find().lean();
        const rooms = await Room.find().lean();
        const beds = await Bed.find().lean();
        res.render('bookings/addBooking', { tenants, rooms, beds });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new booking
router.post('/add', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.redirect('/bookings/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Show form to edit a booking
router.get('/edit/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).lean();
        const tenants = await Tenant.find().lean();
        const rooms = await Room.find().lean();
        const beds = await Bed.find().lean();
        res.render('bookings/editBooking', { booking, tenants, rooms, beds });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Edit a booking
router.post('/edit/:id', async (req, res) => {
    try {
        await Booking.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/bookings/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a booking
router.get('/delete/:id', async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.redirect('/bookings/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
