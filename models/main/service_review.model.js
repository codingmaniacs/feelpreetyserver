const mongoose = require('mongoose');
const shortid = require('shortid');

const Service_reviewSchema = mongoose.Schema(
    {
        
        service_review_id: {
            "type": Number
        },
        service_id: Number,
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
Service_reviewSchema.plugin(AutoIncrement, {id:'order_seq_service_review',inc_field: 'service_review_id'});
module.exports = mongoose.model('Service_reviews', Service_reviewSchema);