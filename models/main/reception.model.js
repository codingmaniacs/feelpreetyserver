const mongoose = require('mongoose');
const shortid = require('shortid');

const ReceptionSchema = mongoose.Schema(
    {
        reception_id: {
            "type": Number
        },
        reception_code: {
            "type": String
        },
        code_type: {
            "type": String
        },
        dinner: {
            "type": String,
            'default': 0
        },
        breakfast: {
            "type": String,
            'default': 0
        },
        lunch: {
            "type": String,
            'default': 0
        },
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
ReceptionSchema.plugin(AutoIncrement, {id:'order_seq_reception',inc_field: 'reception_id'});
module.exports = mongoose.model('Reception', ReceptionSchema);
