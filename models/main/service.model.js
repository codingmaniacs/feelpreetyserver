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
const ServiceSchema = mongoose.Schema({

    category_id: {
        "type": Number
    },
    service_id: {
        "type": Number
    },
    name: String,
    description: String,
    city_location: String,   
    price: { 
     "type": Number
    },    
    status: {
        "type": Number,
        "default": 1
    },
//    file_path: { type: String, required: true }
}, {
    timestamps: true
}, schemaOptions);
var AutoIncrement = require('mongoose-sequence')(mongoose);
ServiceSchema.plugin(AutoIncrement, {id:'order_seq_services',inc_field: 'service_id'});
module.exports = mongoose.model('Service', ServiceSchema);