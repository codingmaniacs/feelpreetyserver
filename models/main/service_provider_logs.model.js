const mongoose = require('mongoose');


const Service_provider_logsSchema = mongoose.Schema(
    {
        service_provider_log_id: {
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
Service_provider_logsSchema.plugin(AutoIncrement, {id:'order_seq_service_provider_logs',inc_field: 'service_provider_log_id'});
module.exports = mongoose.model('Service_provider_logs', Service_provider_logsSchema);