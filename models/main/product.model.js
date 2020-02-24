const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

var schemaOptions = {
   
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  };
const ProductSchema = mongoose.Schema({

    category_id: {
        "type": Number
    },
    product_id: {
        "type": Number
    },
    name: String,
    description: String,   
    price: { 
     "type": Number
    },    
    status: {
        "type": Number,
        "default": 1
    },
    file_path: { type: String, required: true }
}, {
    timestamps: true
}, schemaOptions);
var AutoIncrement = require('mongoose-sequence')(mongoose);
ProductSchema.plugin(AutoIncrement, {id:'order_seq_products',inc_field: 'product_id'});
module.exports = mongoose.model('Product', ProductSchema);