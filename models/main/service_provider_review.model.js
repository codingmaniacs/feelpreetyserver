const mongoose = require('mongoose');
const shortid = require('shortid');

const Service_provider_reviewSchema = mongoose.Schema(
    {
        
        service_provider_review_id: {
            "type": Number
        },
        service_provider_id: Number,
        star: Number,
        user_id: String,
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
Service_provider_reviewSchema.plugin(AutoIncrement, {id:'order_seq_service_provider_review',inc_field: 'service_provider_review_id'});
module.exports = mongoose.model('Service_provider_reviews', Service_provider_reviewSchema);