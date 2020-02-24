const mongoose = require('mongoose');
const shortid = require('shortid');

const StoreSchema = mongoose.Schema(
    {
        store_code: {
            'type': String,
            'default': shortid.generate
          },
        store_id: {
            "type": Number
        },
        store_name: String,
        store_address: String,
        store_city:String,
        store_state:String,
        store_pincode:String,
        store_emailid:String,
        store_phoneno: String,
        owner_name: String,
        owner_address: String,
        owner_city:String,
        owner_pincode:{ type: String },
        owner_phoneno: { type: String},
        status:{
            'type': Number,
            'default': 1
        }
    },
    {
        timestamps: true
    }
);
var AutoIncrement = require('mongoose-sequence')(mongoose);
StoreSchema.plugin(AutoIncrement, {id:'order_seq_store',inc_field: 'store_ai_id'});
module.exports = mongoose.model('Stores', StoreSchema);