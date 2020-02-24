const mongoose = require('mongoose');

const EmailVerificationSchema = mongoose.Schema(
    {
        email_verification_id: {
            "type": Number
        },
        verification_code: {
            "type": String
        },
        email: String,
        status: {
            "type": Number,
            "default": 0
        }       
    },
    {
        timestamps: true
    }
);
var AutoIncrement = require('mongoose-sequence')(mongoose);
EmailVerificationSchema.plugin(AutoIncrement, {id:'order_seq_email_verification',inc_field: 'email_verification_id'});
module.exports = mongoose.model('Email_verifications', EmailVerificationSchema);