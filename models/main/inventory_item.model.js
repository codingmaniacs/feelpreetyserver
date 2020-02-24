const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
const Inventory_itemSchema = mongoose.Schema({
    store_id: {
        "type" : Number 
    },
    inventory_item_id: {
        "type" : Number 
    },
    product_id: {
        "type" : Number 
    },
    product_name: String,
    attributes: {type: String, enum: ['Kg', 'unit', 'lt']},
    opening_stock: String,
    stock_purchased: String,   
    closing_stock: String,
    date: { "type": DateOnly , "default": Date.now },
    status: {
        "type": Number,
        "default": 1
    }
}, {
    timestamps: true
});
var AutoIncrement = require('mongoose-sequence')(mongoose);
Inventory_itemSchema.plugin(AutoIncrement, {id:'order_seq_inventory_item',inc_field: 'inventory_item_id'});
module.exports = mongoose.model('Inventory_item', Inventory_itemSchema);