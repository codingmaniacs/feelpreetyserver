const mongoose = require('mongoose');


const App_user_logsSchema = mongoose.Schema(
    {
        app_user_log_id: {
            "type": Number
        },
        user_id: {
            "type": Number
        },
        token: {
            type: String
        },
        logintime: {type: Date, default: Date.now},
        logouttime: String,
        
        status: {
            "type": Number,
            "default": 1
        }
        
    },
    {
        timestamps: true
    }
);
var AutoIncrement = require('mongoose-sequence')(mongoose);
App_user_logsSchema.plugin(AutoIncrement, {id:'order_seq_app_user_logs',inc_field: 'app_user_log_id'});
module.exports = mongoose.model('App_user_logs', App_user_logsSchema);