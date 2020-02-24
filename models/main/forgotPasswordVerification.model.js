const mongoose = require('mongoose');

const ForgotPasswordVerificationSchema = mongoose.Schema(
    {
        forgot_password_verification_id: {
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
ForgotPasswordVerificationSchema.plugin(AutoIncrement, {id:'order_seq_forgot_password_verification',inc_field: 'forgot_password_verification_id'});
module.exports = mongoose.model('Forgot_password_verifications', ForgotPasswordVerificationSchema);