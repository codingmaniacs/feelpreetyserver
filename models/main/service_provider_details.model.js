const mongoose = require('mongoose');
const shortid = require('shortid');

const Service_providerdetailsSchema = mongoose.Schema(
    {
        
        service_provider_details_id: {
            "type": Number
        },
        service_provider_id: Number,
        service_id: Number,
        price: String,
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
Service_providerdetailsSchema.plugin(AutoIncrement, {id:'order_seq_service_provider_details',inc_field: 'service_provider_details_id'});
module.exports = mongoose.model('Service_provider_details', Service_providerdetailsSchema);