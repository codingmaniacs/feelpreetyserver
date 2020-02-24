const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.user_name = !isEmpty(data.user_name) ? data.user_name : '';
    data.password = !isEmpty(data.password) ? data.password : '';

   /* if(!Validator.isEmail(data.user_name)) {
        errors.emailid = 'Email is invalid';
    }
    */

    if(Validator.isEmpty(data.user_name)) {
        errors.user_name = 'Username is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}