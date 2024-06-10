const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ApplicationData = require('../models/applicationData');
const bcrypt = require('bcrypt');

// User registration route
router.post('/register', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the email or username already exists
        const existingUser = await User.findOne({ email }) || await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Email or username already in use.' });
        }

        // Create new user
        const newUser = new User({ email, username, password });
        await newUser.save();

        // Create initial application data
        const initialApplicationData = {
            userId: newUser._id,
            email: email,
        };
        await ApplicationData.create(initialApplicationData);

        res.status(201).send({ message: 'Registration successful.' });
    } catch (error) {
        res.status(500).send({ message: 'Registration failed.' });
    }
});

// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token for user
        // Here you can optionally generate a token if needed
        // const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
