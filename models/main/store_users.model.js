const mongoose = require('mongoose');
//const stores_schema = require('./store.model');
//const shortid = require('shortid');

const Store_usersSchema = mongoose.Schema(
    {
        
        store_id: {
            'type': Number
        },
        store_user_id: {
            "type": Number
        },
        user_name: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        address: String,
        city:String,
        state:String,
        pincode:String,
        emailid:{
            type: String
        },
        phoneno: {
            type: String,
            required: true,
            unique: true
        },
        avatar: {
            type: String
        },
        
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
Store_usersSchema.plugin(AutoIncrement, {id:'order_seq_store_user',inc_field: 'store_user_id'});
module.exports = mongoose.model('Store_users', Store_usersSchema);