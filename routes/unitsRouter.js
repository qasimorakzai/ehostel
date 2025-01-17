const express = require('express');
const router = express.Router();
const Unit = require('../models/Unit');
const authenticate =require("../middleware/auth")

router.use(authenticate)

// Route to show all units
router.get('/', async (req, res) => {
    try {
        const units = await Unit.find();
        res.render('units/showUnits', { units });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to show the form to add a new unit
router.get('/add', (req, res) => {
    res.render('units/addUnit');
});

// Route to handle the addition of a new unit
router.post('/add', async (req, res) => {
    const { unitName } = req.body;
    try {
        const newUnit = new Unit({ unitName });
        await newUnit.save();
        res.redirect('/units');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to show the form to edit an existing unit
router.get('/edit/:id', async (req, res) => {
    try {
        const unit = await Unit.findById(req.params.id);
        res.render('units/editUnit', { unit });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to handle the update of an existing unit
router.post('/edit/:id', async (req, res) => {
    const { unitName } = req.body;
    try {
        await Unit.findByIdAndUpdate(req.params.id, { unitName });
        res.redirect('/units');
    } catch (error) {
        res.status(500).send(error);
    }
});

// Route to delete a unit
router.get('/delete/:id', async (req, res) => {
    try {
        await Unit.findByIdAndDelete(req.params.id);
        res.redirect('/units');
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
