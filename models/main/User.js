
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    alt_phone_no: {
        type: String,
        required: true,
        unique: true
    },
    phone_no: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    last_activity: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordDate: {
        type: Date,
        default: null
    },
    status: {
        type: Number,
        default: 1
    }


});

const User = mongoose.model('users', UserSchema);

module.exports = User;