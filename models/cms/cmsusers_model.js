
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CmsuserSchema = new Schema({
    user_id: {
      type: Number
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    mobile: {
        type: Number,
        validate: {
        validator: function(v) { 
            return /^\d{10}$/.test(v);
        },
        message: props => `${props.value} is not a valid mobile number!`
        },
        required: [true, 'Mobile number required']
    },
  /*  user_altmobile: {
        type: Number,
        required: [true, 'Alternative mobile number is not valid']
    }, */
  /*  dob: {
        type: Date,
        required: [true, 'Date of birth mobile number is not valid']
    },*/
    password: {
        type: String,
        required: true,
        match: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[@#$%&]).*$/,
        min:8
    },
    avatar: {
        type: String
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    last_activity: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordDate: {
        type: Date,
        default: null
    },
    user_type: {
        type: Number,
        default: 2
    },
    status: {
        type: Number,
        default: 1
    },
    email_verified: {
        type:Number,
        default: 0
    }
});
var AutoIncrement = require('mongoose-sequence')(mongoose);
CmsuserSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'user_id'});
const Cmsuser = mongoose.model('cmsusers', CmsuserSchema);
module.exports = Cmsuser;