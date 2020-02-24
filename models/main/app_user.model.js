const mongoose = require('mongoose');
const shortid = require('shortid');

const App_userSchema = mongoose.Schema(
    {
        
        app_user_id: {
            "type": Number
        },
        user_name: String,
        user_emailid:String,
        user_phoneno: String,
        user_image: String,
        password:String,
        
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
App_userSchema.plugin(AutoIncrement, {id:'order_seq_app_user',inc_field: 'app_user_id'});
module.exports = mongoose.model('App_users', App_userSchema);