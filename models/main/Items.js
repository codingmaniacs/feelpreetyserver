const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
    item_id: Number,
    category_id:Number,
    item_name: String,
    description: String,
    price: Number,
    Qty: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Items', ItemSchema);