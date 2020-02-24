const mongoose = require('mongoose');
const shortid = require('shortid');

const App_user_addressSchema = mongoose.Schema(
    {
        
        app_user_id: {
            "type": Number
        },
        user_address_type: String,
        user_address: String,
        user_city:String,
        user_state:String,
        user_pincode:String,
       
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
App_user_addressSchema.plugin(AutoIncrement, {id:'order_seq_app_user_address',inc_field: 'app_user_address_id'});
module.exports = mongoose.model('App_user_address', App_user_addressSchema);