const mongoose = require('mongoose');


const App_otpsSchema = mongoose.Schema(
    {
        app_otp_id: {
            "type": Number
        },
        user_id: {
            "type": Number
        },
        phone_no: String,
        app_otp: String,
        exp_date: Date,
        otp_status: {
            "type": Number,
            "default": 1
        }
        
    },
    {
        timestamps: true
    }
);
var AutoIncrement = require('mongoose-sequence')(mongoose);
App_otpsSchema.plugin(AutoIncrement, {id:'order_seq_app_otps',inc_field: 'app_otp_id'});
module.exports = mongoose.model('App_otps', App_otpsSchema);