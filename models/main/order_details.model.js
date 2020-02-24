const mongoose = require('mongoose');

const Order_detailSchema = mongoose.Schema({
   /* order_pkid: {
        type: Number
        }, */
    order_id: {
        "type": Number
        },
    product_id: {
        "type": Number
        },
    name: String,
    qty: String,
    price: String,   
    amount: String,   
    status: {
        "type": Number,
        "default": 1
    }
}, {
    timestamps: true
});

var AutoIncrement = require('mongoose-sequence')(mongoose);
Order_detailSchema.plugin(AutoIncrement, {id:'order_seq_order_details',inc_field: 'order_id'});

module.exports = mongoose.model('Order_detail', Order_detailSchema);