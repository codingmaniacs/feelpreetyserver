const mongoose = require('mongoose');

const Booking_detailSchema = mongoose.Schema({
   /* order_pkid: {
        type: Number
        }, */
    booking_id: {
        "type": Number
        },
    service_id: {
        "type": Number
        },
    qty: String,
    name: String,
    price: String,    
    status: {
        "type": Number,
        "default": 1
    }
}, {
    timestamps: true
});

var AutoIncrement = require('mongoose-sequence')(mongoose);
Booking_detailSchema.plugin(AutoIncrement, {id:'order_seq_booking_details',inc_field: 'booking_id'});

module.exports = mongoose.model('Booking_detail', Booking_detailSchema);