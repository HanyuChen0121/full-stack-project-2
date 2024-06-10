const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ApplicationData = require('../models/applicationData'); // Import the ApplicationData model

const registerUser = async (req, res) => {
    const { email, username, password, token } = req.body;

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== email) {
            return res.status(400).send({ message: 'Invalid token.' });
        }

        // Check if the email or username already exists
        const existingUser = await User.findOne({ email }) || await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ message: 'Email or username already in use.' });
        }

        // Create new user
        const newUser = new User({ email, username, password }); // Add proper hashing for password
        await newUser.save();

        // Create initial application data
        const initialApplicationData = {
            userId: newUser._id,
            email: email,
            // Set other fields to initial values as needed
        };
        await ApplicationData.create(initialApplicationData);

        res.status(201).send({ message: 'Registration successful.' });
    } catch (error) {
        res.status(500).send({ message: 'Registration failed.' });
    }
};

module.exports = { registerUser };