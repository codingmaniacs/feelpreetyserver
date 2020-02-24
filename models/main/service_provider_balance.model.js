const mongoose = require('mongoose');

const Service_provider_balanceSchema = mongoose.Schema({
    service_provider_balance_id: {
        "type": Number
    },
    service_provider_id: Number,  
    debit_amount: String,
    credit_amount: String,
    balance_amount: String,   
    status: {
        "type": Number,
        "default": 1
    }
}, {
    timestamps: true
});
var AutoIncrement = require('mongoose-sequence')(mongoose);
Service_provider_balanceSchema.plugin(AutoIncrement, {id:'order_seq_service_provider_balance',inc_field: 'service_provider_balance_id'}); 
module.exports = mongoose.model('Service_provider_balance', Service_provider_balanceSchema);