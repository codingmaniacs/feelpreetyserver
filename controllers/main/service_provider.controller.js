const Service_provider = require('../../models/main/service_provider.model.js');
const Service_provider_balance = require('../../models/main/service_provider_balance.model.js');
const App_otps = require('../../models/main/app_otps.model.js');
const Service_provider_logs = require('../../models/main/service_provider_logs.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var fs = require('file-system');
var multer = require('multer');

var generator = require('generate-password');
 
var randompassword = generator.generate({
    length: 10,
    numbers: true
});

const mongoose = require("mongoose");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

//const store_user = require('./store_user.controller.js');


//Create new Store

exports.create = (req, res) => { // Request validation    
    if(!req.body) {
        return res.status(400).send({
            message: "Cmsusers content can not be empty"
        });
    }


  // var fs = require('fs')
  var now = new Date();
  var dir = "./storage/" + now.getFullYear().toString();
  var dir1 = dir +"/" + now.getMonth().toString();
  var dir2 = dir1 + "/" + now.getDate().toString();
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
     if (!fs.existsSync(dir1)){
          fs.mkdirSync(dir1);
           if (!fs.existsSync(dir2)){
              fs.mkdirSync(dir2);
              
          }
      }
      
  } 
  else if (fs.existsSync(dir)){
   if (!fs.existsSync(dir1)){
        fs.mkdirSync(dir1);
         if (!fs.existsSync(dir2)){
            fs.mkdirSync(dir2);
            
        }
    }
    else if (fs.existsSync(dir1)){
        if (!fs.existsSync(dir2)){
            fs.mkdirSync(dir2);
            
        }

    }
    
} 
  var oldPath = req.body.service_provider_image_filepath;
  var oldPath1 = req.body.service_provider_documents_filepath;
  var oldPath2 = req.body.makeup_certificate_filepath;
  // var filename = console.log(oldPath.substring(13));
 /* var filename = */
 var newPath = './storage/'+ now.getFullYear().toString()+'/'+now.getMonth().toString()+'/'+now.getDate().toString()+'/' + oldPath.substring(13);
 var newPath1 = './storage/'+ now.getFullYear().toString()+'/'+now.getMonth().toString()+'/'+now.getDate().toString()+'/' + oldPath1.substring(13);
 var newPath2 = './storage/'+ now.getFullYear().toString()+'/'+now.getMonth().toString()+'/'+now.getDate().toString()+'/' + oldPath2.substring(13)
 console.log(newPath);
 console.log(newPath1);
 console.log(newPath2);
  fs.rename(oldPath, newPath, function (err) {
  if (err) throw err
  console.log('Successfully  moved!')
  })
  fs.rename(oldPath1, newPath1, function (err) {
    if (err) throw err
    console.log('Successfully  moved!')
    })
    fs.rename(oldPath2, newPath2, function (err) {
        if (err) throw err
        console.log('Successfully  moved!')
        })


    const service_provider = new Service_provider({
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_city: req.body.user_city,
        user_state: req.body.user_state,
        user_pincode: req.body.user_pincode,
        user_emailid:req.body.user_emailid,
        user_phoneno: req.body.user_phoneno,
        password: req.body.password,
        service_id: req.body.service_id,
        service_locations: req.body.service_locations,
        service_provider_image_filepath: newPath,
        service_provider_documents_filepath: newPath1,
        makeup_certificate_filepath: newPath2
    });
    bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error('There was an error', err);
        else {
            bcrypt.hash(service_provider.password, salt, (err, hash) => {
                if(err) console.error('There was an error', err);
                else {
                    service_provider.password = hash;
                    service_provider.save().then(service_provider => {

                        console.log(service_provider);                      
                        const service_provider_balance = new Service_provider_balance({
        
                            service_provider_id: service_provider.service_provider_id , 
                            debit_amount: 0,
                            credit_amount: 1000 ,
                            balance_amount: 1000 
                           
                        });
                    
                        // Save Item in the database
                        service_provider_balance.save()
                        return res.status(200).json({
                            status: true,
                            status_code: 200,
                            message: "OK",
                            data: service_provider
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
    if(!req.body) {

        return res.status(400).send({
            message: "store content can not be empty"
        });
    }

    // Create a Store
    const otp = Math.floor(Math.random() * 899999 + 100000);
            const exp_date = 1;
    const app_otps = new App_otps({


        phone_no:req.body.phone_no || "No store owner address",
        app_otp: otp,
        exp_date: exp_date




    });

    // Save Store in the database
    app_otps.save()
    .then(data => {
        return res.status(200).send({
            
            otp: data.app_otp
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the store."
        });
    });
};

// Retrieve all Store from the database.
exports.findAll = (req, res) => {
    Service_provider.find()
    .then(service_provider => {
        res.send(service_provider);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving store."
        });
    });
};

// Find a single product with a productId

// Find a single product with a productId
//Login

// exports.loginme = (req, res) => {
//     const phone_no = req.params.phone_no;
//     const app_otp = req.params.app_otp;
//     console.log(phone_no);
//     App_otps.find({
//         phone_no: phone_no,
//         app_otp: app_otp,
//         status: 1
//     }).then(app_otps => {

//         const payload = {
//             phone_no: app_otps.phone_no
//         };
//         var token = jwt.sign(payload, 'AIPLSERVER@123', {
//             expiresIn: 1440 // expires in 24 hours        
//         });

//         res.status(200).json({
//             status: true,
//             status_code: 200,
//             message: "OK",
//             data: app_otps,
//             token: 'Bearer ' + token
//         });
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving products."
//         });
//     });
// }

//Login
exports.loginme = (req, res) => {
    var user_name = req.body.user_name;
    var password = req.body.password;
    Service_provider.findOne({ user_name: user_name }, function(err, result) {
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
                            var token = jwt.sign(payload, 'AIPLSERVER@123', {
                                expiresIn: 1440 // expires in 24 hours        
                            });

                            res.status(200).json({
                                
                                message: 'Login Successfull',
                                data: {
                                    'user_name': result.user_name,
                                   
                                },
                                token: 'Bearer ' + token
                            });
                        } else {
                            //res.send("Password does not matched!");
                            res.status(201).json({
                               
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
                res.status(201).json({
                    
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

/*
exports.verifyme = (req, res) => {
    var phone_no = req.body.phone_no;
    var app_otp = req.body.app_otp;
    console.log(phone_no);

    App_otps.find({$and: [{ phone_no:phone_no},{app_otp:app_otp},{otp_status: 1}]}).then(app_otps => {


        //saving mobile no in app user database
        console.log(app_otps.phone_no)

        if(app_otps === undefined || app_otps.length == 0) {
            return res.status(201).json({
                message: "phone not found with id " + req.body.phone_no
            });            
        }else{

            const app_user = new App_user({
                user_phoneno: phone_no
            });
            app_user.save();
    
             //End of mobile no in app user database
    
             //update otp status to 0 in app otps table
    
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
            var token = jwt.sign(payload, 'AIPLSERVER@123', {
                expiresIn: 1440 // expires in 24 hours        
            });

            res.status(200).json({
                status: true,
                status_code: 200,
                message: "OK",
                data: app_otps,
                token: 'Bearer ' + token
                });
            }
         }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while verifying number."
                });
            });
 }


*/

exports.getService_providerByFilter = (req, res) => {
  
    const service_provider_id = req.body.service_provider_id;
    const service_locations = req.body.service_locations;
    const service_id = req.body.service_id;

    console.log(service_provider_id);
    Service_provider.find({ $or: [ { service_id : { $regex: '.*' + service_id + '.*' } },{ service_provider_id : service_provider_id },{ service_locations: { $regex: '.*' + service_locations + '.*' } } ] }).then(service_provider => {
        res.status(200).json({
            
            message: "OK",
            data: service_provider
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
}      

exports.loginwithemailornumber = (req, res) => {
    var user_input = req.body.user_input;
    var password = req.body.password;

    if(user_input.match(/^-{0,1}\d+$/)){
        var user_phoneno = user_input;
        Service_provider.findOne({ user_phoneno: user_phoneno }, function(err, result) {
            if (err) {
                console.log("Errors : " + JSON.stringify(err));
            } else { //console.log(result);
                if (result) {
                    var dbPass = result.password;
                    var user_id = result.service_provider_id;
                    bcrypt.compare(password, dbPass, function(crypterr, cryptres) {
                        if (crypterr) {
                            console.log("Errors : " + JSON.stringify(crypterr));
                        } else {
                            if (cryptres) {
                                const payload = {
                                    user_pkid: result._id,
                                    user_id: result.service_provider_id
                                };
                                var token = jwt.sign(payload, 'AIPLSERVER@123', {
                                    expiresIn: 1440 // expires in 24 hours        
                                });
    
                                //save details in user logs
                                const service_provider_logs = new Service_provider_logs({


                                    user_id: user_id|| "No user id ",
                                    token: token
                                                             
                            
                                });
                             console.log(service_provider_logs);
                                // Save Store in the database
                                service_provider_logs.save()

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
                                res.status(201).json({
                                    status: false,
                                    status_code: 201,
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
                    res.status(201).json({
                        
                        // message: 'Email ID does not matched!',
                        data: {
                            'user_phoneno': 'user_phone does not matched!',
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
        

        Service_provider.findOne({ user_emailid: user_emailid }, function(err, result) {
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
                                var token = jwt.sign(payload, 'AIPLSERVER@123', {
                                    expiresIn: 1440 // expires in 24 hours        
                                });
                                
                                //save details in user logs
                                const service_provider_logs = new Service_provider_logs({


                                    user_id: user_id|| "No user id ",
                                    token: token
                                                             
                            
                                });
                             console.log(service_provider_logs);
                                // Save Store in the database
                                service_provider_logs.save()

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
                                res.status(201).json({
                                   
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
                    res.status(201).json({
                        
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

exports.verifyme = (req, res) => {
    var phone_no = req.body.phone_no;
    var app_otp = req.body.app_otp;
    console.log(phone_no);

    App_otps.find({$and: [{ phone_no:phone_no},{app_otp:app_otp},{otp_status: 1}]}).then(app_otps => {


        //saving mobile no in app user database
        console.log(app_otps.phone_no)

        if(app_otps === undefined || app_otps.length == 0) {
            return res.status(201).json({
                message: "phone not found with id " + req.body.phone_no
            });            
        }else{

            Service_provider.find({ user_phoneno:phone_no},{status: 0}).then(service_provider => {

        if(service_provider === undefined || service_provider.length == 0) {

            const service_provider = new Service_provider({
                user_phoneno: phone_no,
                password: randompassword,
                user_emailid: ""
            });
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(service_provider.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            service_provider.password = hash;
                            service_provider.save();
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
            var token = jwt.sign(payload, 'AIPLSERVER@123', {
                expiresIn: 1440 // expires in 24 hours        
            });

            res.status(200).json({
                
                message: "OK",
                data: app_otps,
                token: 'Bearer ' + token
                });
            }

            else {

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
                var token = jwt.sign(payload, 'AIPLSERVER@123', {
                    expiresIn: 1440 // expires in 24 hours        
                });
    
                res.status(200).json({
                    
                    message: "OK",
                    data: app_otps,
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

 exports.validateserviceprovider = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "category content can not be empty"
        });
    }

    // Find and update Category with the request body
    Service_provider.findByIdAndUpdate(req.params.serviceproviderId, {
        status: 1 || "No category name", 
       
       
    }, {new: true})
    .then(service_provider => {
        if(!service_provider) {
            return res.status(404).send({
                message: "category not found with id " + req.params.serviceproviderId
            });
        }
        res.send(service_provider);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.serviceproviderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.serviceproviderId
        });
    });
};

exports.updatepass = function(req, res) {
    console.log(req.body);
    var user_emailid = req.body.user_emailid;
    var newPass = req.body.new_pass;

    Service_provider.findOne({ user_emailid: user_emailid }, function(userErr, result) {
        if (userErr) {
            console.log("Errors : " + JSON.stringify(userErr));
        } else { //console.log(result);
            if (result) {
                var dbPass = result.password;
               
                            bcrypt.genSalt(10, function(err, salt) {
                                bcrypt.hash(newPass, salt, function(err, hash) {
                                    Service_provider.findOneAndUpdate({ user_emailid: user_emailid }, { $set: { password: hash } }, { new: true }, (err, doc) => {
                                        if (err) {
                                            res.send("Something went wrong when updating data!");
                                        } else {
                                            if (doc) {
                                                console.log(doc);
                                                const payload = {
                                                    check: true
                                                };
                                                var token = jwt.sign(payload, 'AIPLSERVER@123', {
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

    Service_provider.findOne({ user_emailid: user_emailid }, function(userErr, result) {
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
                                    Service_provider.findOneAndUpdate({ user_emailid: user_emailid }, { $set: { password: hash } }, { new: true }, (err, doc) => {
                                        if (err) {
                                            res.send("Something went wrong when updating data!");
                                        } else {
                                            if (doc) {
                                                console.log(doc);
                                                const payload = {
                                                    check: true
                                                };
                                                var token = jwt.sign(payload, 'AIPLSERVER@123', {
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
