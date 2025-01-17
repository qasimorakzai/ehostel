const express = require('express');
const router = express.Router();
const Hostel = require('../models/hostel');
const ManagementUser = require('../models/managementUser');  // Updated import
const authenticate = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

router.use(authenticate);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



// Show all hostels
router.get('/show', async (req, res) => {
    try {
        const hostels = await Hostel.find().populate('selectAdmin selectWardens').lean();
        res.render('hostels/showHostels', { hostels });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Route to display the 'Add Hostel' form
router.get('/add', async (req, res) => {
    try {
        const admins = await ManagementUser.find({ role: 'Admin' }).lean();
        const wardens = await ManagementUser.find({ role: 'Warden' }).lean();
        res.render('hostels/addHostel', { admins, wardens }); // Render form with admin and warden options
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error'); // Handle errors
    }
});

// Route to handle 'Add Hostel' form submission
router.post('/add', upload.single('attachments'), async (req, res) => {
    try {
        // Create a new hostel object with data from the form
        const newHostel = new Hostel({
            hostelName: req.body.hostelName,
            landLineNumber: req.body.landLineNumber,
            mobileNumber: req.body.mobileNumber,
            address: req.body.address,
            googleMap: req.body.googleMap,
            websiteAddress: req.body.websiteAddress,
            socialMedia: req.body.socialMedia,
            hostelFor: req.body.hostelFor,
            email: req.body.email,
            selectAdmin: req.body.selectAdmin,
            selectWardens: req.body.selectWardens,
            attachments: req.file ? req.file.filename : null // Handle file upload
        });

        await newHostel.save(); // Save the new hostel to the database
        res.redirect('/hostels/show'); // Redirect to the show hostels page
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error'); // Handle errors
    }
});

// Show form to edit a hostel
router.get('/edit/:id', async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id).lean();
        const admins = await ManagementUser.find({ role: 'Admin' }).lean();  // Fetch admins from ManagementUser
        const wardens = await ManagementUser.find({ role: 'Warden' }).lean(); // Fetch wardens from ManagementUser
        res.render('hostels/editHostel', { hostel, admins, wardens });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Edit a hostel
router.post('/edit/:id', upload.single('attachments'), async (req, res) => {
    try {
        const hostel = await Hostel.findById(req.params.id);
        const updateData = {
            ...req.body,
            attachments: req.file ? req.file.filename : hostel.attachments
        };
        await Hostel.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/hostels/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a hostel
router.get('/delete/:id', async (req, res) => {
    try {
        await Hostel.findByIdAndDelete(req.params.id);
        res.redirect('/hostels/show');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
