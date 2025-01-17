const express = require('express');
const router = express.Router();
const ManagementUser = require('../models/managementUser');
const authenticate =require("../middleware/auth")

router.use(authenticate)

// Show all users
router.get('/', async (req, res) => {
    try {
        const users = await ManagementUser.find({});
        res.render('managementUser/showUsers', { users });
    } catch (error) {
        res.status(500).send("Error in fetching users");
    }
});

// Add new user form
router.get('/add', (req, res) => {
    res.render('managementUser/addUser');
});

// Create new user
router.post('/add', async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        const newUser = new ManagementUser({ name, email, password, role });
        await newUser.save();
        res.redirect('/managementUsers');
    } catch (error) {
        res.status(500).send("Error in adding user");
    }
});

// Edit user form
router.get('/edit/:id', async (req, res) => {
    try {
        const user = await ManagementUser.findById(req.params.id);
        res.render('managementUser/editUser', { user });
    } catch (error) {
        res.status(500).send("Error in fetching user");
    }
});

// Update user
router.post('/edit/:id', async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).send('Passwords do not match');
    }

    try {
        await ManagementUser.findByIdAndUpdate(req.params.id, { name, email, password, role });
        res.redirect('/managementUsers');
    } catch (error) {
        res.status(500).send("Error in updating user");
    }
});

// Delete user
router.get('/delete/:id', async (req, res) => {
    try {
        await ManagementUser.findByIdAndDelete(req.params.id);
        res.redirect('/managementUsers');
    } catch (error) {
        res.status(500).send("Error in deleting user");
    }
});

module.exports = router;
