const express = require('express');
const router = express.Router();
const ApplicationData = require('../models/applicationData');

// Route to handle application data submission
router.post('/submit-application', async (req, res) => {
    const { userId, applicationData } = req.body;

    try {
        const existingApplication = await ApplicationData.findOne({ userId });

        if (existingApplication) {
            // Update existing application data
            await ApplicationData.updateOne({ userId }, applicationData);
            res.status(200).send({ message: 'Application updated successfully.' });
        } else {
            // Create new application data
            const newApplication = new ApplicationData({ userId, ...applicationData });
            await newApplication.save();
            res.status(201).send({ message: 'Application submitted successfully.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Application submission failed.' });
    }
});

module.exports = router;