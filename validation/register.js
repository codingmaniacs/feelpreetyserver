const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.emailid = !isEmpty(data.emailid) ? data.emailid : '';
    data.phoneno = !isEmpty(data.phoneno) ? data.phoneno : '';
   // data.dob = !isEmpty(data.dob) ? data.dob : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password_confirm = !isEmpty(data.password_confirm) ? data.password_confirm : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 to 30 chars';
    }
    
    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(!Validator.isEmail(data.emailid)) {
        errors.emailid = 'Emailid is invalid';
    }

    if(Validator.isEmpty(data.emailid)) {
        errors.emailid = 'Emailid is required';
    }

    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must have 6 chars';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password is required';
    }

    if(!Validator.isLength(data.password_confirm, {min: 6, max: 30})) {
        errors.password_confirm = 'Password must have 6 chars';
    }

    if(!Validator.equals(data.password, data.password_confirm)) {
        errors.password_confirm = 'Password and Confirm Password must match';
    }

    if(Validator.isEmpty(data.password_confirm)) {
        errors.password_confirm = 'Password is required';
    }

    /*
    if(Validator.isEmpty(data.dob)) {
        errors.dob = 'DOB is required';
    }
    */
    if(!Validator.isLength(data.phoneno, {min: 10, max: 10})) {
        errors.password_confirm = 'Phone number must be of 10 digits';
    }
    if(Validator.isEmpty(data.phoneno)) {
        errors.phoneno = 'Phone Number is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}