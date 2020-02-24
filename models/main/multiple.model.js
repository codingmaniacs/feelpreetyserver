const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MultipleSchema = mongoose.Schema({
    name: String,
    multiple_id: {
        "type": Number
    },
    description: String,
    status: {
        "type": Number,
        "default": 1
    },
    imagePath:[String],  
}, {
    timestamps: true
});

var AutoIncrement = require('mongoose-sequence')(mongoose);
MultipleSchema.plugin(AutoIncrement, {id:'order_seq_multiple',inc_field: 'multiple_id'});

module.exports = mongoose.model('Multiple', MultipleSchema);