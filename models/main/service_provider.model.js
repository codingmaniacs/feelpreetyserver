const mongoose = require('mongoose');
const shortid = require('shortid');

const Service_providerSchema = mongoose.Schema(
    {
        
        service_provider_id: {
            "type": Number
        },
        user_name: String,
        user_address: String,
        user_city:String,
        user_state:String,
        user_pincode:String,
        user_emailid:String,
        user_phoneno: String,
        password:String,
        service_locations:String,
        service_id: String,
        service_provider_image_filepath: String,
        service_provider_documents_filepath: String,
        makeup_certificate_filepath: String,
        status:{
            'type': Number,
            'default': 0
        }
    },
    {
        timestamps: true
    }
);
var AutoIncrement = require('mongoose-sequence')(mongoose);
Service_providerSchema.plugin(AutoIncrement, {id:'order_seq_service_provider',inc_field: 'service_provider_id'});
module.exports = mongoose.model('Service_providers', Service_providerSchema);