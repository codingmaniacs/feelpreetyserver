const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schemaOptions = {
   
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  };
const CategorySchema = mongoose.Schema({
    name: String,
    cat_id: {
        "type": Number
    },
    status: {
        "type": Number,
        "default": 1
    },
    description: String,   
    file_path: { type: String, required: true }
}, {
    timestamps: true
}, schemaOptions);

var AutoIncrement = require('mongoose-sequence')(mongoose);
CategorySchema.plugin(AutoIncrement, {id:'order_seq_category',inc_field: 'cat_id'});

module.exports = mongoose.model('Category', CategorySchema);