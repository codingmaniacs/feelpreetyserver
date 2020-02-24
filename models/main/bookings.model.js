const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
    booking_id: {
        "type": Number
    },
    service_provider_id: String, 
    app_user_id: String, 
    total_amount: String,
    total_services: String,   
    status: {
        "type": Number,
        "default": 1
    },
    booking_confirm: {
        "type": Number,
        "default": 0
    },
    booking_completed_service_provider: {
        "type": Number,
        "default": 0
    },
    // booking_completed_app_user: {
    //     "type": Number,
    //     "default": 0
    // }
}, {
    timestamps: true
});
var AutoIncrement = require('mongoose-sequence')(mongoose);
BookingSchema.plugin(AutoIncrement, {id:'order_seq_bookings',inc_field: 'booking_id'}); 
module.exports = mongoose.model('Booking', BookingSchema);