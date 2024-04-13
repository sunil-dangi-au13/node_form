// models/user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName: String,
    phoneNumber: String,
    email: String,
    dateOfBirth: Date,
    ipAddress: String,
    deviceType: String,
    browser: String,
    userAgent: String,
    previousAddresses: { address: String }
});

module.exports = mongoose.model('User', userSchema);
