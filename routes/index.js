// routes/index.js

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const ExtractDeviceInfo = require('./ExtractDeviceInfo');

router.use(ExtractDeviceInfo);

// Render the form page
router.get('/', (req, res) => {
    const { ip, type, browser, userAgent } = req;
    res.render('form', { firstName: req.query.firstName, ...req });
});

// Handle form submission
router.post('/submit', [
    check('firstName').notEmpty(),
    check('lastName').notEmpty(),
    check('phoneNumber').isMobilePhone(),
    check('email').isEmail(),
    check('dateOfBirth').isDate(),
    check('previousAddresses.*.address').notEmpty()
], async (req, res) => {
    const { ipAddress, deviceType, browser, userAgent } = req;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check for duplicate submission
    const existingUser = await User.findOne({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    });
    if (existingUser) {
        return res.status(400).json({ message: 'Duplicate form submission' });
    }

    // Save user details to the database
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
       // ipAddress: req,
       // deviceType: req,
        //browser: req,
        //userAgent: req,
        previousAddresses: req.body.previousAddresses,
        ipAddress, deviceType, browser, userAgent

    });

    await newUser.save();

    res.status(201).json({ message: 'User created successfully','data':newUser });
});

module.exports = router;
