const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/userRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const cors = require('cors');
const multer = require('multer'); 
const app = express();
const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://mattmelody0121:UsPpQm2ykofrAQGT@cluster0.bli2zcl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', 
                { useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                    console.log('Connected to MongoDB');
                })
                .catch(err => {
                    console.log('Error connecting to MongoDB', err);
                });

app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
