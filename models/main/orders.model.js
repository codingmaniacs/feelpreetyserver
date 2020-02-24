const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    order_id: {
        "type": Number
    },
    store_id: {
        "type": Number
    },
    store_user_id: String,  
    total_amount: String,
    total_items: String,   
    status: {
        "type": Number,
        "default": 1
    }
}, {
    timestamps: true
});
var AutoIncrement = require('mongoose-sequence')(mongoose);
OrderSchema.plugin(AutoIncrement, {id:'order_seq_orders',inc_field: 'order_id'}); 
module.exports = mongoose.model('Order', OrderSchema);