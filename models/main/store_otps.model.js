const mongoose = require('mongoose');

const Store_otpsSchema = mongoose.Schema(
    {
        store_otp_id: {
            "type": Number
        },
        store_id: {
            "type": Number
        },
        store_code: String,
        store_otp: String,
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
Store_otpsSchema.plugin(AutoIncrement, {id:'order_seq_store_otps',inc_field: 'store_otp_id'});
module.exports = mongoose.model('Store_otps', Store_otpsSchema);