const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CompanySchema = mongoose.Schema({
    name: String,
    company_id: {
        "type": Number
    },
    description: String,
    avatar: String,
    address: String,
    company_owner: String,
    status: {
        "type": Number,
        "default": 1
    },
    imagePath:
    {
        type: String
    }    
}, {
    timestamps: true
});

var AutoIncrement = require('mongoose-sequence')(mongoose);
CompanySchema.plugin(AutoIncrement, {id:'order_seq_company',inc_field: 'company_id'});

module.exports = mongoose.model('Company', CompanySchema);