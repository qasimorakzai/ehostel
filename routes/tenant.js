const express = require('express');
const router = express.Router();
const Tenant = require('../models/tenant');
const authenticate =require("../middleware/auth")

router.use(authenticate);

// Create (GET and POST)
router.get('/add', (req, res) => {
    res.render('tenants/addTenant');
});

router.post('/add', async (req, res) => {
    try {
        const tenant = new Tenant(req.body);
        await tenant.save();
        res.redirect('/tenants');
    } catch (error) {
        res.status(400).send('Unable to save tenant data');
    }
});

// Read (GET all)
router.get('/', async (req, res) => {
    try {
        const tenants = await Tenant.find({});
        res.render('tenants/showTenants', { tenants });
    } catch (error) {
        res.status(400).send('Unable to get tenant data');
    }
});

// Update (GET and POST)
router.get('/edit/:id', async (req, res) => {
    try {
        const tenant = await Tenant.findById(req.params.id);
        res.render('tenants/editTenant', { tenant });
    } catch (error) {
        res.status(400).send('Unable to find tenant');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        await Tenant.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/tenants');
    } catch (error) {
        res.status(400).send('Unable to update tenant data');
    }
});

// Delete
router.post('/delete/:id', async (req, res) => {
    try {
        await Tenant.findByIdAndDelete(req.params.id);
        res.redirect('/tenants');
    } catch (error) {
        res.status(400).send('Unable to delete tenant');
    }
});

module.exports = router;
