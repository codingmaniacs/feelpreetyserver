const App_user = require('../../models/main/app_user.model.js');
const App_user_logs = require('../../models/main/app_user_logs.model.js');
const App_otps = require('../../models/main/app_otps.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var generator = require('generate-password');
 
var randompassword = generator.generate({
    length: 10,
    numbers: true
});

//const store_user = require('./store_user.controller.js');


//Create new app user

exports.create = (req, res) => { // Request validation    
    if(!req.body) {
        return res.status(400).send({
            message: "Cmsusers content can not be empty"
        });
    }
    const app_user = new App_user({
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_city: req.body.user_city,
        user_state: req.body.user_state,
        user_pincode: req.body.user_pincode,
        user_emailid:req.body.user_emailid,
        user_phoneno: req.body.user_phoneno,
        password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error('There was an error', err);
        else {
            bcrypt.hash(app_user.password, salt, (err, hash) => {
                if(err) console.error('There was an error', err);
                else {
                    app_user.password = hash;
                    app_user.save().then(app_user => {
                        return res.status(200).json({
                            message: "OK",
                            data: app_user
                        });
                        
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Something wrong while creating the store users."
                        });
                    });
                }
            });
        }
    });
};


exports.createotp = (req, res) => {
    // Request validation
    if(!req.body.phone_no) {

        return res.status(400).send({
            message: "phone no content can not be empty"
        });
    }

    // Create a otp
    const otp = Math.floor(Math.random() * 899999 + 100000);
            const exp_date = 1;
    const app_otps = new App_otps({


        phone_no:req.body.phone_no || "No phone no",
        app_otp: otp,
        exp_date: exp_date

    });

    // Save otps in the database
    app_otps.save()
    .then(data => {
        return res.status(200).send({
            

            phone_no: data.phone_no
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the app otp."
        });
    });
};

// Retrieve all otps from the database.
exports.findAll = (req, res) => {
    App_otps.find()
    .then(app_otps => {
        res.send(app_otps);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving store."
        });
    });
};


exports.loginme = (req, res) => {
    var user_name = req.body.user_name;
    var password = req.body.password;
    App_user.findOne({ user_name: user_name }, function(err, result) {
        if (err) {
            console.log("Errors : " + JSON.stringify(err));
        } else { //console.log(result);
            if (result) {
                var dbPass = result.password;
                bcrypt.compare(password, dbPass, function(crypterr, cryptres) {
                    if (crypterr) {
                        console.log("Errors : " + JSON.stringify(crypterr));
                    } else {
                        if (cryptres) {
                            const payload = {
                                user_pkid: result._id,
                                user_id: result.user_id
                            };
                            var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                expiresIn: 1440 // expires in 24 hours        
                            });

                            res.status(200).json({
                                status: true,
                                status_code: 200,
                                message: 'Login Successfull',
                                data: {
                                    'user_name': result.user_name,
                                   
                                },
                                token: 'Bearer ' + token
                            });
                        } else {
                            //res.send("Password does not matched!");
                            res.status(400).json({
                                status: false,
                                status_code: 400,
                                // message: 'Password does not matched!',
                                data: {
                                    'user_name': '',
                                    'password': 'Password does not matched!'
                                },
                                token: null
                            });
                        } //End of if else
                    } //End of if else              
                });
            } else {
                //res.send("Email ID does not matched!");
                res.status(400).json({
                    
                    // message: 'Email ID does not matched!',
                    data: {
                        'user_name': 'user_name does not matched!',
                        'password': ''
                    },
                    token: null
                });
            } //End of if else            
        } //End of if else
    });
};


exports.verifyme = (req, res) => {
    var phone_no = req.body.phone_no;
    var app_otp = req.body.app_otp;
    console.log(phone_no);

    App_otps.find({$and: [{ phone_no:phone_no},{app_otp:app_otp},{otp_status: 1}]}).then(app_otps => {


        //saving mobile no in app user database
        console.log(app_otps.phone_no)

            if(app_otps === undefined || app_otps.length == 0) {
                return res.status(400).json({
                    message: "phone not found with id " + req.body.phone_no
                });            
            }else{

            App_user.find({ user_phoneno:phone_no},{status: 1}).then(app_user => {

                    if(app_user === undefined || app_user.length == 0) {

                                                const app_user = new App_user({
                                                    user_phoneno: phone_no,
                                                    password: randompassword,
                                                    user_emailid: ""
                                                });
                                                bcrypt.genSalt(10, (err, salt) => {
                                                    if(err) console.error('There was an error', err);
                                                    else {
                                                        bcrypt.hash(app_user.password, salt, (err, hash) => {
                                                            if(err) console.error('There was an error', err);
                                                            else {
                                                                app_user.password = hash;
                                                                app_user.save();
                                                            }
                                                        });
                                                    }
                                                });
                                        
                                                //End of mobile no in app user database
                                        
                                                //update otp status to 0 in app otps table
                                        
                                                const app_otps_update_data = {                
                                                    otp_status: 0,
                                                    updatedAt: Date.now()
                                                };
                                            
                                                App_otps.updateOne({phone_no: phone_no, app_otp: app_otp ,otp_status: 1}, app_otps_update_data, function(err, res) {
                                                    res.modifiedCount;
                                                });
                                        
                                                //update otp status to 0 in app otps table
                                            
                                                const payload = {
                                                    phone_no: phone_no
                                                };
                                                var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                                    expiresIn: 1440 // expires in 24 hours        
                                                });

                                                res.status(200).json({
                                                    
                                                    message: "OK",
                                                    data: {
                                                        user_name: '',
                                                        user_phoneno: phone_no,
                                                        user_image: ''
                                                    },
                                                    token: 'Bearer ' + token
                                                    });
                                        
                                        } else {

                                        const app_otps_update_data = {                
                                            otp_status: 0,
                                            updatedAt: Date.now()
                                        };
                                    
                                        App_otps.updateOne({phone_no: phone_no, otp_status: 1}, app_otps_update_data, function(err, res) {
                                            res.modifiedCount;
                                        });
                                
                                        //update otp status to 0 in app otps table
                                    
                                        const payload = {
                                            phone_no: phone_no
                                        };
                                        var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                            expiresIn: 1440 // expires in 24 hours        
                                        });
                            
                                        res.status(200).json({
                                            
                                            message: "OK",
                                            data: {
                                                user_name: app_user.user_name,
                                                user_phoneno: app_user.user_phoneno,
                                                user_image: app_user.user_image
                                            },
                                            token: 'Bearer ' + token
                                            });

                                        }
                                    });
                                }
                            }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Something wrong while verifying number."
                                    });
                                });
                        }



 exports.loginwithemailornumber = (req, res) => {
    var user_input = req.body.user_input;
    var password = req.body.password;

    if(user_input.match(/^-{0,1}\d+$/)){
        var user_phoneno = user_input;
        App_user.findOne({ user_phoneno: user_phoneno }, function(err, result) {
            if (err) {
                console.log("Errors : " + JSON.stringify(err));
            } else { //console.log(result);
                if (result) {
                    var dbPass = result.password;
                    var user_id = result.app_user_id;
                    bcrypt.compare(password, dbPass, function(crypterr, cryptres) {
                        if (crypterr) {
                            console.log("Errors : " + JSON.stringify(crypterr));
                        } else {
                            if (cryptres) {
                                const payload = {
                                    user_pkid: result._id,
                                    user_id: result.app_user_id
                                };
                                var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                    expiresIn: 1440 // expires in 24 hours        
                                });
    
                                //save details in user logs
                                const app_user_logs = new App_user_logs({


                                    user_id: user_id|| "No user id ",
                                    token: token
                                                             
                            
                                });
                             console.log(app_user_logs);
                                // Save Store in the database
                                app_user_logs.save()

                                //end of details in user logs

                                res.status(200).json({
                                    
                                    message: 'Login Successfull',
                                    data: {
                                        'user_phoneno': result.user_phoneno,
                                       
                                    },
                                    token: 'Bearer ' + token
                                });
                            } else {
                                //res.send("Password does not matched!");
                                res.status(400).json({
                                    status: false,
                                    status_code: 400,
                                    // message: 'Password does not matched!',
                                    data: {
                                        'user_phoneno': '',
                                        'password': 'Password does not matched!'
                                    },
                                    token: null
                                });
                            } //End of if else
                        } //End of if else              
                    });
                } else {
                    //res.send("Email ID does not matched!");
                    res.status(400).json({
                        
                        // message: 'Email ID does not matched!',
                        data: {
                            'user_phoneno': 'user_phoneno does not matched!',
                            'password': ''
                        },
                        token: null
                    });
                } //End of if else            
            } //End of if else
        });

      }
      else{
        var user_emailid = user_input;
        

        App_user.findOne({ user_emailid: user_emailid }, function(err, result) {
            if (err) {
                console.log("Errors : " + JSON.stringify(err));
            } else { //console.log(result);
                if (result) {
                    var dbPass = result.password;
                    var user_id = result.app_user_id;
                    bcrypt.compare(password, dbPass, function(crypterr, cryptres) {
                        if (crypterr) {
                            console.log("Errors : " + JSON.stringify(crypterr));
                        } else {
                            if (cryptres) {
                                const payload = {
                                    user_pkid: result._id,
                                    user_id: result.app_user_id
                                };
                                var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                    expiresIn: 1440 // expires in 24 hours        
                                });
                                
                                //save details in user logs
                                const app_user_logs = new App_user_logs({


                                    user_id: user_id|| "No user id ",
                                    token: token
                                                             
                            
                                });
                             console.log(app_user_logs);
                                // Save Store in the database
                                app_user_logs.save()

                                //end of details in user logs

                                res.status(200).json({

                                    message: 'Login Successfull',
                                    data: {
                                        'user_emailid': result.user_emailid,
                                       
                                    },
                                    token: 'Bearer ' + token
                                });
                            } else {
                                //res.send("Password does not matched!");
                                res.status(400).json({
                                   
                                    // message: 'Password does not matched!',
                                    data: {
                                        'user_emailid': '',
                                        'password': 'Password does not matched!'
                                    },
                                    token: null
                                });
                            } //End of if else
                        } //End of if else              
                    });
                } else {
                    //res.send("Email ID does not matched!");
                    res.status(400).json({
                        
                        // message: 'Email ID does not matched!',
                        data: {
                            'user_emailid': 'user_emailid does not matched!',
                            'password': ''
                        },
                        token: null
                    });
                } //End of if else            
            } //End of if else
        });
      }

};

exports.updatepass = function(req, res) {
    console.log(req.body);
    var user_emailid = req.body.user_emailid;
    var newPass = req.body.new_pass;

    App_user.findOne({ user_emailid: user_emailid }, function(userErr, result) {
        if (userErr) {
            console.log("Errors : " + JSON.stringify(userErr));
        } else { //console.log(result);
            if (result) {
                var dbPass = result.password;
               
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(newPass, salt, function(err, hash) {
                                    App_user.findOneAndUpdate({ user_emailid: user_emailid }, { $set: { password: hash } }, { new: true }, (err, doc) => {
                                        if (err) {
                                            res.send("Something went wrong when updating data!");
                                        } else {
                                            if (doc) {
                                                console.log(doc);
                                                const payload = {
                                                    check: true
                                                };
                                                var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                                    expiresIn: 1440 // expires in 24 hours        
                                                });
                                                res.json({
                                                    status: true,
                                                    status_code: 200,
                                                    message: 'Password has been successfully updated!',
                                                    data: doc,
                                                    token: token
                                                });
                                            } else {
                                                res.send("Email ID does not matched!");
                                            } //End of if else
                                        } //End of if else
                                    });
                                });
                                     
                });
            } else {
                res.send("Email ID does not matched!");
            } //End of if else            
        } //End of if else
    });

};       

exports.changepass = function(req, res) {
    console.log(req.body);
    var user_emailid = req.body.user_emailid;
    var userPass = req.body.password;
    var newPass = req.body.new_pass;

    App_user.findOne({ user_emailid: user_emailid }, function(userErr, result) {
        if (userErr) {
            console.log("Errors : " + JSON.stringify(userErr));
        } else { //console.log(result);
            if (result) {
                var dbPass = result.password;
                bcrypt.compare(userPass, dbPass, function(crypterr, cryptres) {
                    if (crypterr) {
                        console.log("Errors : " + JSON.stringify(crypterr));
                    } else {
                        if (cryptres) {
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(newPass, salt, function(err, hash) {
                                    App_user.findOneAndUpdate({ user_emailid: user_emailid }, { $set: { password: hash } }, { new: true }, (err, doc) => {
                                        if (err) {
                                            res.send("Something went wrong when updating data!");
                                        } else {
                                            if (doc) {
                                                console.log(doc);
                                                const payload = {
                                                    check: true
                                                };
                                                var token = jwt.sign(payload, 'InnovativeCodeX@#*', {
                                                    expiresIn: 1440 // expires in 24 hours        
                                                });
                                                res.json({
                                                    status: true,
                                                    status_code: 200,
                                                    message: 'Password has been successfully updated!',
                                                    data: doc,
                                                    token: token
                                                });
                                            } else {
                                                res.send("Email ID does not matched!");
                                            } //End of if else
                                        } //End of if else
                                    });
                                });
                            });
                        } else {
                            res.send("Password does not matched!");
                        } //End of if else
                    } //End of if else              
                });
            } else {
                res.send("Email ID does not matched!");
            } //End of if else            
        } //End of if else
    });

};

