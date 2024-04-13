// app.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const device = require('express-device');
const path = require('path');

const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(device.capture());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/userfo');
const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
