// routes/tenantReport.js

const express = require('express');
const router = express.Router();
const Tenant = require('../models/tenant');
const Booking = require('../models/booking');
const Room = require('../models/room');
const Bed = require('../models/bed');
const Service = require('../models/service');
const authenticate = require('../middleware/auth');

// Apply authentication middleware
router.use(authenticate);

/**
 * @route   GET /tenant-report
 * @desc    Display form to select tenant
 */
router.get('/', async (req, res) => {
    try {
        const tenants = await Tenant.find().lean();
        res.render('tenantReports/selectTenant', { tenants });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

/**
 * @route   POST /tenant-report
 * @desc    Generate and display tenant report
 */
router.post('/', async (req, res) => {
    const tenantId = req.body.tenantId;

    try {
        const tenant = await Tenant.findById(tenantId).lean();

        if (!tenant) {
            return res.status(404).send('Tenant not found');
        }

        const bookings = await Booking.find({ tenant: tenantId })
            .populate('room')
            .populate('bed')
            .lean();

        const services = await Service.find({ tenant: tenantId }).populate('hostel').lean();

        const totalServiceCost = services.reduce((total, service) => total + service.servicePrice, 0);
        const totalBookingCost = bookings.reduce((total, booking) => total + booking.monthlyRent, 0);

        res.render('tenantReports/tenantReport', { tenant, bookings, services, totalServiceCost, totalBookingCost });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
