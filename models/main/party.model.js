const mongoose = require('mongoose');
const PartySchema = mongoose.Schema({
    name: String,
    cat_id: {
        "type": Number
    },
    description: String,
    avatar: String,
    
    status: {
        "type": String,
        "default": 1
    }    
}, {
    timestamps: true
});

var AutoIncrement = require('mongoose-sequence')(mongoose);
PartySchema.plugin(AutoIncrement, {id:'order_seq2',inc_field: 'cat_id'});

module.exports = mongoose.model('Party', PartySchema);