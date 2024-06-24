const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ApplicationData = require('../models/applicationData');
const bcrypt = require('bcrypt');
const multer = require('multer');
// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Specify file name format
    }
});

const upload = multer({ storage: storage });
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
        const applicationData = await ApplicationData.findOne({ email });

        res.json({ message: 'Login successful',
                applicationData
         });
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
        userData.applicationStatus = "Pending";
        // Find the application data by email
        let applicationData = await ApplicationData.findOne({ email });

        // If no application data found, create a new entry
        if (!applicationData) {
            applicationData = new ApplicationData({
                email,
                ...userData, // Spread the userData received from Redux
                applicationStatus: "Pending"
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

router.get('/employees', async (req, res) => {
    try {
      const employees = await ApplicationData.find().sort({ lastName: 1 }); // Sort alphabetically by last name
      res.json(employees);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.get('/employees/:id', async (req, res) => {
    try {
      const employee = await ApplicationData.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

router.get('/employees/visa/in-progress', async (req, res) => {
    try {
        const inProgressEmployees = await ApplicationData.find({
            'documents.status': 'Pending' // Employees with at least one pending document
        });
        res.json(inProgressEmployees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all employees with visa status
router.get('/employees/visa/all', async (req, res) => {
    try {
        const allVisaEmployees = await ApplicationData.find({
            workAuthorization: { $ne: '' } // Example condition
        });
        res.json(allVisaEmployees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Approve or reject a document
router.post('/employees/visa/approve', async (req, res) => {
    const { employeeId, documentId, approve, feedback } = req.body;

    try {
        const employee = await ApplicationData.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Find the document and update its status
        const document = employee.documents.id(documentId);
        if (!document) {
            return res.status(404).json({ message: 'Document not found' });
        }

        document.status = approve ? 'Approved' : 'Rejected';
        document.feedback = feedback;

        await employee.save();
        res.status(200).json({ message: 'Document status updated' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Send notification
router.post('/employees/visa/notify', async (req, res) => {
    const { employeeId, message } = req.body;

    try {
        const employee = await ApplicationData.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Logic to send email notification
        // ...

        res.status(200).json({ message: 'Notification sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/employees/updateStatus', async (req, res) => {
    const { id, status, feedback } = req.body;
  
    try {
      const applicationData = await ApplicationData.findById(id);
      if (!applicationData) {
        return res.status(404).json({ message: 'Application data not found' });
      }
  
      applicationData.applicationStatus = status;
      if (status === 'Rejected') {
        applicationData.applcationFeedback = feedback;
      }
  
      await applicationData.save();
      res.status(200).json({ message: 'Application status updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to update application status' });
    }
  });
  
router.post('/employees/visa/upload', upload.single('file'), async (req, res) => {
    const { employeeId, documentType } = req.body;

    try {
        const employee = await ApplicationData.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Here you can save the file URL or other relevant information in your database
        // For example, if you want to save the file URL in the employee's document field
        // Update the document file name based on the documentType
        switch (documentType) {
            case 'opt':
                employee.optFileName = req.file.filename;
                employee.optStatus = 'Pending'; // Set status as needed
                break;
            case 'optEad':
                employee.optEadFileName = req.file.filename;
                employee.optEadStatus = 'Pending'; // Set status as needed
                break;
            case 'i983':
                employee.i983FileName = req.file.filename;
                employee.i983Status = 'Pending'; // Set status as needed
                break;
            case 'i20':
                employee.i20FileName = req.file.filename;
                employee.i20Status = 'Pending'; // Set status as needed
                break;
            default:
                return res.status(400).json({ message: 'Invalid document type' });
        }

        await employee.save();

        res.status(200).json({ message: `${documentType} file uploaded successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to upload file' });
    }
});

router.post('/employees/updateStatus', async (req, res) => {
    const { id, feedback, documentType, status } = req.body;

    try {
        const applicationData = await ApplicationData.findById(id);
        if (!applicationData) {
            return res.status(404).json({ message: 'Application data not found' });
        }

        switch (documentType) {
            case 'opt':
                applicationData.optStatus = status;
                break;
            case 'optEad':
                applicationData.optEadStatus = status;
                break;
            case 'i20':
                applicationData.i20Status = status;
                break;
            case 'i983':
                applicationData.i983Status = status;
                break;
            default:
                return res.status(400).json({ message: 'Invalid document type' });
        }

        if (status === 'Rejected') {
            applicationData.documentFeedback = feedback;
        }

        await applicationData.save();
        res.status(200).json({ message: 'Document status updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update document status' });
    }
});
module.exports = router;
