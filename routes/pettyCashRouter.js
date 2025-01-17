const express = require('express');
const router = express.Router();
const PettyCash = require('../models/PettyCash');
const multer = require('multer');
const path = require('path');
const authenticate=require("../middleware/auth")

router.use(authenticate)

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/pettyCashAttachments');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Show all petty cash entries
router.get('/', async (req, res) => {
    try {
        const pettyCashEntries = await PettyCash.find();
        res.render('pettyCash/showPettyCash', { pettyCashEntries });
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

// Show form to add new petty cash entry
router.get('/add', (req, res) => {
    res.render('pettyCash/addPettyCash');
});

// Add new petty cash entry
router.post('/add', upload.single('attachments'), async (req, res) => {
    try {
        const newPettyCash = new PettyCash({
            date: req.body.date,
            amountAdded: req.body.amountAdded,
            attachments: req.file ? req.file.filename : '',
            remarks: req.body.remarks
        });
        await newPettyCash.save();
        res.redirect('/pettyCash');
    } catch (err) {
        console.log(err);
        res.render('pettyCash/addPettyCash', { error: 'Error adding petty cash entry.' });
    }
});

// Edit petty cash entry form
router.get('/edit/:id', async (req, res) => {
    try {
        const pettyCash = await PettyCash.findById(req.params.id);
        res.render('pettyCash/editPettyCash', { pettyCash });
    } catch (err) {
        console.log(err);
        res.redirect('/pettyCash');
    }
});

// Update petty cash entry
router.post('/edit/:id', upload.single('attachments'), async (req, res) => {
    try {
        const pettyCash = await PettyCash.findById(req.params.id);
        pettyCash.date = req.body.date;
        pettyCash.amountAdded = req.body.amountAdded;
        pettyCash.remarks = req.body.remarks;
        if (req.file) {
            pettyCash.attachments = req.file.filename;
        }
        await pettyCash.save();
        res.redirect('/pettyCash');
    } catch (err) {
        console.log(err);
        res.render('pettyCash/editPettyCash', { error: 'Error updating petty cash entry.' });
    }
});

// Delete petty cash entry
router.post('/delete/:id', async (req, res) => {
    try {
        await PettyCash.findByIdAndDelete(req.params.id);
        res.redirect('/pettyCash');
    } catch (err) {
        console.log(err);
        res.redirect('/pettyCash');
    }
});

module.exports = router;
