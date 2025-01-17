const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const Hostel = require('../models/hostel');
const Tenant = require('../models/tenant');
const authenticate =require("../middleware/auth")

router.use(authenticate);

// Route to show all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().populate('hostel').populate('tenant');
        res.render('services/index', { services });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to show form for adding a new service
router.get('/add', async (req, res) => {
    try {
        const hostels = await Hostel.find();
        const tenants = await Tenant.find();
        res.render('services/add', { hostels, tenants });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to handle adding a new service
router.post('/add', async (req, res) => {
    const { serviceTitle, servicePrice, charged, remarks, hostel, tenant } = req.body;
    const newService = new Service({ serviceTitle, servicePrice, charged, remarks, hostel, tenant });
    try {
        await newService.save();
        res.redirect('/services');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to show form for editing a service
router.get('/edit/:id', async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('hostel').populate('tenant');
        const hostels = await Hostel.find();
        const tenants = await Tenant.find();
        res.render('services/edit', { service, hostels, tenants });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to handle editing a service
router.post('/edit/:id', async (req, res) => {
    const { serviceTitle, servicePrice, charged, remarks, hostel, tenant } = req.body;
    try {
        await Service.findByIdAndUpdate(req.params.id, { serviceTitle, servicePrice, charged, remarks, hostel, tenant });
        res.redirect('/services');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to delete a service
router.get('/delete/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.redirect('/services');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
