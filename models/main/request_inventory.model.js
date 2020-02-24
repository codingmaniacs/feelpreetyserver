const mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
const Request_inventorySchema = mongoose.Schema({
    req_inventory_id: {
        "type" : Number }, 
    store_id: {
        "type" : Number }, 
    
    product_id: {
        "type" : Number },
    stock_request: String,   
   
    status: {
        "type": Number,
        "default": 0
    }
}, {
    timestamps: true
});

var AutoIncrement = require('mongoose-sequence')(mongoose);
Request_inventorySchema.plugin(AutoIncrement, {id:'order_seq_req_inv',inc_field: 'req_inventory_id'});

module.exports = mongoose.model('Request_inventory', Request_inventorySchema);