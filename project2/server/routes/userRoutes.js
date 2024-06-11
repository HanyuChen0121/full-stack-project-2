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

        // Dispatch action to update userId in Redux store
        

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/saveData', async (req, res) => {
    const { email, userData } = req.body; // Assuming you're sending userData from Redux

    try {
        // Find the user by email to get the userId
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Add the userId to the userData
        userData.userId = user._id;

        // Find the application data by email
        let applicationData = await ApplicationData.findOne({ email });

        // If no application data found, create a new entry
        if (!applicationData) {
            applicationData = new ApplicationData({
                email,
                ...userData // Spread the userData received from Redux
            });
        } else {
            // If application data exists, update it with the new userData
            applicationData = await ApplicationData.findOneAndUpdate({ email }, userData, { new: true });
        }

        // Save the updated or new application data
        await applicationData.save();

        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to save data' });
    }
});

module.exports = router;
