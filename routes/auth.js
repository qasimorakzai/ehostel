const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// Render registration form
router.get('/register', (req, res) => {
    res.render('register'); // Create register.hbs view
});

// Handle registration form submission
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.redirect('/auth/login');
});

// Render login form
router.get('/login', (req, res) => {
    res.render('login'); // Create login.hbs view
});

// Handle login form submission
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/hostelHome'); // Redirect to hostels or any protected route
});

// Handle logout
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the JWT token cookie
    res.redirect('/auth/login'); // Redirect to login page
});

module.exports = router;
