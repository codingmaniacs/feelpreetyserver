const Cmsusers = require('../../models/cms/cmsusers_model.js');
const Verification_link = require('../../models/main/EmailVerification.model.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var nodemailer = require("nodemailer");
var crypto = require('crypto');



var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "ranjit@avantikain.com",
        pass: "aiplglobal"
    }
});
var rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/

//Create new Cmsusers
exports.create = (req, res) => { // Request validation    
    if (!req.body) {
        return res.status(400).send({
            message: "Cmsusers content can not be empty"
        });
    }
    const cmsusers = new Cmsusers({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        // user_altmobile: req.body.user_altmobile,
        user_type: req.body.user_type,
        // dob:req.body.dob,
        password: req.body.password
    });
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.error('There was an error', err);
        else {
            bcrypt.hash(cmsusers.password, salt, (err, hash) => {
                if (err) console.error('There was an error', err);
                else {
                    cmsusers.password = hash;
                    cmsusers.save().then(user => {
                        email = cmsusers.email;
                        status = cmsusers.status;
                       // send_mail(email, status , req ,res);
                        //email send code
                        email = cmsusers.email;
                        Cmsusers.findOne({ email: email, status: 0 }, function(err, user) {
                            // rand=Math.floor((Math.random() * 100) + 54);
                            rand = crypto.randomBytes(16).toString('hex')
                            host = req.get('host');
                            link = "http://" + req.get('host') + "/api/verify?id=" + rand;

                            mailOptions = {
                                to: email,
                                subject: "Please confirm your Email account",
                                //html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
                                html: ' <!DOCTYPE html>' +
                                    '<html>' +
                                    '<head>' +
                                    '<meta charset="utf-8">' +
                                    '<meta http-equiv="x-ua-compatible" content="ie=edge">' +
                                    '<title>Email Confirmation</title>' +
                                    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                                    '<style type="text/css">' +
                                    'table,' +
                                    'td {' +
                                    'mso-table-rspace: 0pt;' +
                                    'mso-table-lspace: 0pt;' +
                                    '}' +
                                    'img {' +
                                    '-ms-interpolation-mode: bicubic;' +
                                    '}' +
                                    'a[x-apple-data-detectors] {' +
                                    'font-family: inherit !important;' +
                                    'font-size: inherit !important;' +
                                    'font-weight: inherit !important;' +
                                    'line-height: inherit !important;' +
                                    'color: inherit !important;' +
                                    'text-decoration: none !important;' +
                                    '}' +
                                    'div[style*="margin: 16px 0;"] {' +
                                    'margin: 0 !important;' +
                                    '}' +
                                    'body {' +
                                    'width: 100% !important;' +
                                    'height: 100% !important;' +
                                    'padding: 0 !important;' +
                                    'margin: 0 !important;' +
                                    '}' +
                                    'table {' +
                                    'border-collapse: collapse !important;' +
                                    '}' +
                                    'a {' +
                                    'color: #1a82e2;' +
                                    '}' +

                                    '</style>' +

                                    '</head>' +
                                    '<body style="background-color: #e9ecef;">' +
                                    '<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">' +
                                    'Kindly click the button below to confirm your email address for the registered account in Avantika POS.' +
                                    '</div>' +

                                    '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +

                                    '<tr>' +
                                    '<td align="center" bgcolor="#e9ecef">' +
                                    '<!--[if (gte mso 9)|(IE)]>' +
                                    '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                                    '<tr>' +
                                    '<td align="center" valign="top" width="600">' +
                                    '<![endif]-->' +
                                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
                                    '<tr>' +
                                    '<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0;border-top: 3px solid #d4dadf;">' +
                                    '<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>' +
                                    '</td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '<!--[if (gte mso 9)|(IE)]>' +
                                    '</td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '<![endif]-->' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end hero -->' +
                                    '<!-- start copy block -->' +
                                    '<tr>' +
                                    '<td align="center" bgcolor="#e9ecef">' +
                                    '<!--[if (gte mso 9)|(IE)]>' +
                                    '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                                    '<tr>' +
                                    '<td align="center" valign="top" width="600">' +
                                    '<![endif]-->' +
                                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +

                                    '<!-- start copy -->' +
                                    '<tr>' +
                                    '<td align="left" bgcolor="#ffffff" style="padding: 24px; font-size: 16px; line-height: 24px;">' +
                                    '<p style="margin: 0;">Tap the button below to confirm your email address for the registered account in Avantika POS. If you didn&apos;t create an account with <a href="http://pos.avantikain.com">Avantika POS</a>, you can safely delete this email.</p>' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end copy -->' +

                                    '<!-- start button -->' +
                                    '<tr>' +
                                    '<td align="left" bgcolor="#ffffff">' +
                                    '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
                                    '<tr>' +
                                    '<td align="center" bgcolor="#ffffff" style="padding: 12px;">' +
                                    '<table border="0" cellpadding="0" cellspacing="0">' +
                                    '<tr>' +
                                    '<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">' +
                                    '<a href=' + link + ' target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm Account</a>' +
                                    '</td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '</td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end button -->' +

                                    '<!-- start copy -->' +
                                    '<tr>' +
                                    '<td align="left" bgcolor="#ffffff" style="padding: 24px; font-size: 16px; line-height: 24px;">' +
                                    '<p style="margin: 0;">If that doesn&apos;t work, copy and paste the following link in your browser:</p>' +
                                    '<p style="margin: 0;"><a href=' + link + ' target="_blank"></p>' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end copy -->' +

                                    '<!-- start copy -->' +
                                    '<tr>' +
                                    '<td align="left" bgcolor="#ffffff" style="padding: 24px;font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">' +
                                    '<p style="margin: 0;">Thank You,<br> TeamAvantika POS</p>' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end copy -->' +

                                    '</table>' +
                                    '<!--[if (gte mso 9)|(IE)]>' +
                                    '</td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '<![endif]-->' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end copy block -->' +

                                    '<!-- start footer -->' +
                                    '<tr>' +
                                    '<td align="center" bgcolor="#e9ecef" style="padding: 24px;">' +
                                    '<!--[if (gte mso 9)|(IE)]>' +
                                    '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                                    '<tr>' +
                                    '<td align="center" valign="top" width="600">' +
                                    '<![endif]-->' +
                                    '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +

                                    '<!-- start permission -->' +
                                    '<tr>' +
                                    '<td align="center" bgcolor="#e9ecef" style="padding: 12px 24px;font-size: 14px; line-height: 20px; color: #666;">' +
                                    '<p style="margin: 0;">You received this email because we received a request for registration of your account. If you didn&apos;t request for the registration you can safely delete this email.</p>' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end permission -->' +

                                    '</table>' +
                                    '<!--[if (gte mso 9)|(IE)]>' +
                                    '</td>' +
                                    '</tr>' +
                                    '</table>' +
                                    '<![endif]-->' +
                                    '</td>' +
                                    '</tr>' +
                                    '<!-- end footer -->' +

                                    '</table>' +
                                    '<!-- end body -->' +

                                    '</body>' +
                                    '</html>'
                            }
                            console.log(mailOptions);
                            smtpTransport.sendMail(mailOptions, function(error, response) {
                                if (error) {
                                    console.log(error);
                                    res.end("error");
                                } else {
                                    console.log("Message sent: " + response.message);
                                    res.end("sent");
                                }
                            });



                            //send

                            //save link start
                            // console.log(mailOptions.link);
                            rand1 = rand;
                            link1 = "http://" + req.get('host') + "/api/verify?id=" + rand1;
                            const verification_link = new Verification_link({


                                link: link1 || "No link",
                                email: email || "No email id"

                            });

                            // Save Item in the database
                            verification_link.save()
                                .then(data => {
                                    res.send(data);
                                }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Something wrong while storing the link."
                                    });
                                }); // verification link closed

                        }); //mail sent closed
                        //end of verification link
                        return res.status(200).json({
                            status: true,
                            status_code: 200,
                            message: "OK",
                            data: cmsusers
                        });

                    }).catch(err => {
                        console.log(err)

                        if (err.code == 11000) {
                            res.status(201).send({
                                //message: "Email id already exists.",
                                data: {
                                    'email': 'Email id already exists.'
                                }
                                // message2: err.message || "Email id already exist"
                            });
                        } else {
                            res.status(500).send({
                                message: err.message || "Something went wrong while creating cmsusers.",
                                // message2: err.message || "Email id already exist"
                            });

                        }
                    });
                }
            });
        }
    });
};

// Retrieve all Cmsusers from the database.
exports.findAll = (req, res) => {
    Cmsusers.find()
        .then(cmsusers => {
            res.send(cmsusers);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving cmsuser."
            });
        });
};

// Find a single product with a productId
exports.findOne = (req, res) => {
    Cmsusers.findById(req.params.cmsuserId)
        .then(cmsusers => {
            if (!cmsusers) {
                return res.status(404).send({
                    message: "cmsuser not found with id " + req.params.cmsuserId
                });
            } else {
                res.send(cmsusers);
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cmsuser not found with id " + req.params.cmsuserId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving cmsuser with id " + req.params.cmsuserId
            });
        });
};

// Update a record
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "cmsuser content can not be empty"
        });
    }
    Cmsusers.findByIdAndUpdate(req.params.cmsuserId, {
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            dob: req.body.dob,
            password: req.body.password
        }, { new: true })
        .then(cmsusers => {
            if (!cmsusers) {
                return res.status(404).send({
                    message: "cmsuser not found with id " + req.params.cmsuserId
                });
            }
            return res.status(200).json({
                status: true,
                status_code: 200,
                message: "cms user updated",
                data: cmsusers
            });
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "cmsuser not found with id " + req.params.cmsuserId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.cmsuserId
            });
        });
};

//Update Password
exports.updatepass = function(req, res) {
    console.log(req.body);
    var email = req.body.email;
    var userPass = req.body.password;
    var newPass = req.body.new_pass;

    Cmsusers.findOne({ email: email }, function(userErr, result) {
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
                                    Cmsusers.findOneAndUpdate({ email: email }, { $set: { password: hash } }, { new: true }, (err, doc) => {
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

    /*
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(userPass, salt, function(err, hash) {
                Cmsusers.findOneAndUpdate(
                    {cmsemail: email}, 
                    {$set:{cmsuser_pass:hash}}, 
                    {new: true}, (err, doc) => {
                    if (err) {
                        res.send("Something went wrong when updating data!");
                    } else {
                        if(doc) {
                            console.log(doc);
                            res.send("Password has been successfully updated!");
                        } else {
                            res.send("Email ID does not matched!");
                        }//End of if else
                    }//End of if else
                });
            });
        });
        */
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Cmsusers.findByIdAndRemove(req.params.cmsuserId)
        .then(cmsusers => {
            if (!cmsusers) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.cmsuserId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "cmsuser not found with id " + req.params.cmsuserId
                });
            }
            return res.status(500).send({
                message: "Could not delete cmsuser with id " + req.params.cmsuserId
            });
        });
};

//Remove all
exports.deleteall = (req, res) => {
    Cmsusers.remove()
        .then(results => {
            console.log("Delete Results : " + JSON.stringify(results));
            res.send({ message: "All Records has been deleted successfully!" });
        }).catch(errors => {
            console.log("Delete Results : " + JSON.stringify(errors));
            res.send({ message: "Error in deleting records" });
        })
};


//Login
exports.loginme = (req, res) => {
    var email = req.body.email;
    var userPass = req.body.password;
    Cmsusers.findOne({ email: email }, function(err, result) {
        if (err) {
            console.log("Errors : " + JSON.stringify(err));
        } else { //console.log(result);
            if (result) {
                var dbPass = result.password;
                bcrypt.compare(userPass, dbPass, function(crypterr, cryptres) {
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
                                status: true,
                                status_code: 200,
                                message: 'Login Successfull',
                                data: {
                                    'email': result.email,
                                    'email_verified': result.email_verified
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
                                    'email': '',
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
                    status: false,
                    status_code: 201,
                    // message: 'Email ID does not matched!',
                    data: {
                        'email': 'Email ID does not matched!',
                        'password': ''
                    },
                    token: null
                });
            } //End of if else            
        } //End of if else
    });
};


//Test
exports.testjwt = (req, res) => {
    /*
    var uname = req.body.uname;
    var pass = req.body.pass;
    if (uname === "alom") {
        if (pass === "pass") {
            const payload = {
                check: true
            };
            var token = jwt.sign(payload, 'AIPLSERVER@123', {
                expiresIn: 1440 // expires in 24 hours        
            });
            res.json({
                message: 'authentication done ',
                token: token
            });
        } else {
            res.json({message: "please check your password !"})
        }
    } else {
        res.json({message: "user not found !"})
    }//End of if else
*/

    Cmsusers.find()
        .then(cmsusers => {
            //res.send(cmsusers);
            const payload = {
                id: cmsusers.email,
                check: true
            };
            var token = jwt.sign(payload, 'AIPLSERVER@123', {
                expiresIn: 1440 // expires in 24 hours        
            });
            res.json({
                status: true,
                status_code: 200,
                message: 'Data has been successfully fetched from server',
                data: cmsusers,
                token: token
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving cmsuser."
            });
        });
};

exports.resendemail = (req, res) => {
    email = req.body.email;
    status = 0;
    send_mail(email, status ,req,res);
   /* rand = crypto.randomBytes(16).toString('hex')
    host = req.get('host');
    link = "http://" + req.get('host') + "/api/verify?id=" + rand;

   mailOptions = {
       to: email,
       subject: "Please confirm your Email account",
       //html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
       html: ' <!DOCTYPE html>' +
           '<html>' +
           '<head>' +
           '<meta charset="utf-8">' +
           '<meta http-equiv="x-ua-compatible" content="ie=edge">' +
           '<title>Email Confirmation</title>' +
           '<meta name="viewport" content="width=device-width, initial-scale=1">' +
           '<style type="text/css">' +
           'table,' +
           'td {' +
           'mso-table-rspace: 0pt;' +
           'mso-table-lspace: 0pt;' +
           '}' +
           'img {' +
           '-ms-interpolation-mode: bicubic;' +
           '}' +
           'a[x-apple-data-detectors] {' +
           'font-family: inherit !important;' +
           'font-size: inherit !important;' +
           'font-weight: inherit !important;' +
           'line-height: inherit !important;' +
           'color: inherit !important;' +
           'text-decoration: none !important;' +
           '}' +
           'div[style*="margin: 16px 0;"] {' +
           'margin: 0 !important;' +
           '}' +
           'body {' +
           'width: 100% !important;' +
           'height: 100% !important;' +
           'padding: 0 !important;' +
           'margin: 0 !important;' +
           '}' +
           'table {' +
           'border-collapse: collapse !important;' +
           '}' +
           'a {' +
           'color: #1a82e2;' +
           '}' +

           '</style>' +

           '</head>' +
           '<body style="background-color: #e9ecef;">' +
           '<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">' +
           'Kindly click the button below to confirm your email address for the registered account inAvantika POS.' +
           '</div>' +

           '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +

           '<tr>' +
           '<td align="center" bgcolor="#e9ecef">' +
           '<!--[if (gte mso 9)|(IE)]>' +
           '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
           '<tr>' +
           '<td align="center" valign="top" width="600">' +
           '<![endif]-->' +
           '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
           '<tr>' +
           '<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0;border-top: 3px solid #d4dadf;">' +
           '<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>' +
           '</td>' +
           '</tr>' +
           '</table>' +
           '<!--[if (gte mso 9)|(IE)]>' +
           '</td>' +
           '</tr>' +
           '</table>' +
           '<![endif]-->' +
           '</td>' +
           '</tr>' +
           '<!-- end hero -->' +
           '<!-- start copy block -->' +
           '<tr>' +
           '<td align="center" bgcolor="#e9ecef">' +
           '<!--[if (gte mso 9)|(IE)]>' +
           '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
           '<tr>' +
           '<td align="center" valign="top" width="600">' +
           '<![endif]-->' +
           '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +

           '<!-- start copy -->' +
           '<tr>' +
           '<td align="left" bgcolor="#ffffff" style="padding: 24px; font-size: 16px; line-height: 24px;">' +
           '<p style="margin: 0;">Tap the button below to confirm your email address for the registered account inAvantika POS. If you didn&apos;t create an account with <a href="http://competitioncare.com">Competition Care</a>, you can safely delete this email.</p>' +
           '</td>' +
           '</tr>' +
           '<!-- end copy -->' +

           '<!-- start button -->' +
           '<tr>' +
           '<td align="left" bgcolor="#ffffff">' +
           '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
           '<tr>' +
           '<td align="center" bgcolor="#ffffff" style="padding: 12px;">' +
           '<table border="0" cellpadding="0" cellspacing="0">' +
           '<tr>' +
           '<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">' +
           '<a href=' + link + ' target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm Account</a>' +
           '</td>' +
           '</tr>' +
           '</table>' +
           '</td>' +
           '</tr>' +
           '</table>' +
           '</td>' +
           '</tr>' +
           '<!-- end button -->' +

           '<!-- start copy -->' +
           '<tr>' +
           '<td align="left" bgcolor="#ffffff" style="padding: 24px; font-size: 16px; line-height: 24px;">' +
           '<p style="margin: 0;">If that doesn&apos;t work, copy and paste the following link in your browser:</p>' +
           '<p style="margin: 0;"><a href=' + link + ' target="_blank"></p>' +
           '</td>' +
           '</tr>' +
           '<!-- end copy -->' +

           '<!-- start copy -->' +
           '<tr>' +
           '<td align="left" bgcolor="#ffffff" style="padding: 24px;font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">' +
           '<p style="margin: 0;">Thank You,<br> TeamAvantika POS</p>' +
           '</td>' +
           '</tr>' +
           '<!-- end copy -->' +

           '</table>' +
           '<!--[if (gte mso 9)|(IE)]>' +
           '</td>' +
           '</tr>' +
           '</table>' +
           '<![endif]-->' +
           '</td>' +
           '</tr>' +
           '<!-- end copy block -->' +

           '<!-- start footer -->' +
           '<tr>' +
           '<td align="center" bgcolor="#e9ecef" style="padding: 24px;">' +
           '<!--[if (gte mso 9)|(IE)]>' +
           '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
           '<tr>' +
           '<td align="center" valign="top" width="600">' +
           '<![endif]-->' +
           '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +

           '<!-- start permission -->' +
           '<tr>' +
           '<td align="center" bgcolor="#e9ecef" style="padding: 12px 24px;font-size: 14px; line-height: 20px; color: #666;">' +
           '<p style="margin: 0;">You received this email because we received a request for registration of your account. If you didn&apos;t request for the registration you can safely delete this email.</p>' +
           '</td>' +
           '</tr>' +
           '<!-- end permission -->' +

           '</table>' +
           '<!--[if (gte mso 9)|(IE)]>' +
           '</td>' +
           '</tr>' +
           '</table>' +
           '<![endif]-->' +
           '</td>' +
           '</tr>' +
           '<!-- end footer -->' +

           '</table>' +
           '<!-- end body -->' +

           '</body>' +
           '</html>'
   }
   console.log(mailOptions);
   smtpTransport.sendMail(mailOptions, function(error, response) {
       if (error) {
           console.log(error);
           res.end("error");
       } else {
           console.log("Message sent: " + response.message);
           // res.send(mailOptions);
           return res.status(200).json({
               status: true,
               status_code: 200,
               message: "OK",
               data: {
                   'email': mailOptions.to
               }
           });


       }
   });     */    
}

exports.verifyemail = (req, res) => {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {

        console.log(rand);
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            console.log("email is verified");

            Cmsusers.findOneAndUpdate({ email: mailOptions.to }, { $set: { email_verified: 1 } }, { new: true }, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }

                console.log(doc);
            });
            res.end("<h1>Email " + mailOptions.to + " is been Successfully verified</h1>");
        } else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source</h1>");
    }
}

function send_mail(email, status, req){
    // documents array
    Cmsusers.findOne({ email: email, status: 0 }, function(err, user) {
        // rand=Math.floor((Math.random() * 100) + 54);
        rand = crypto.randomBytes(16).toString('hex')
        host = req.get('host');
        link = "http://" + req.get('host') + "/api/verify?id=" + rand;

        mailOptions = {
            to: email,
            subject: "Please confirm your Email account",
            //html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
            html: ' <!DOCTYPE html>' +
                '<html>' +
                '<head>' +
                '<meta charset="utf-8">' +
                '<meta http-equiv="x-ua-compatible" content="ie=edge">' +
                '<title>Email Confirmation</title>' +
                '<meta name="viewport" content="width=device-width, initial-scale=1">' +
                '<style type="text/css">' +
                'table,' +
                'td {' +
                'mso-table-rspace: 0pt;' +
                'mso-table-lspace: 0pt;' +
                '}' +
                'img {' +
                '-ms-interpolation-mode: bicubic;' +
                '}' +
                'a[x-apple-data-detectors] {' +
                'font-family: inherit !important;' +
                'font-size: inherit !important;' +
                'font-weight: inherit !important;' +
                'line-height: inherit !important;' +
                'color: inherit !important;' +
                'text-decoration: none !important;' +
                '}' +
                'div[style*="margin: 16px 0;"] {' +
                'margin: 0 !important;' +
                '}' +
                'body {' +
                'width: 100% !important;' +
                'height: 100% !important;' +
                'padding: 0 !important;' +
                'margin: 0 !important;' +
                '}' +
                'table {' +
                'border-collapse: collapse !important;' +
                '}' +
                'a {' +
                'color: #1a82e2;' +
                '}' +

                '</style>' +

                '</head>' +
                '<body style="background-color: #e9ecef;">' +
                '<div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">' +
                'Kindly click the button below to confirm your email address for the registered account in Avantika POS.' +
                '</div>' +

                '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +

                '<tr>' +
                '<td align="center" bgcolor="#e9ecef">' +
                '<!--[if (gte mso 9)|(IE)]>' +
                '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                '<tr>' +
                '<td align="center" valign="top" width="600">' +
                '<![endif]-->' +
                '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +
                '<tr>' +
                '<td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0;border-top: 3px solid #d4dadf;">' +
                '<h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<!--[if (gte mso 9)|(IE)]>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<![endif]-->' +
                '</td>' +
                '</tr>' +
                '<!-- end hero -->' +
                '<!-- start copy block -->' +
                '<tr>' +
                '<td align="center" bgcolor="#e9ecef">' +
                '<!--[if (gte mso 9)|(IE)]>' +
                '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                '<tr>' +
                '<td align="center" valign="top" width="600">' +
                '<![endif]-->' +
                '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +

                '<!-- start copy -->' +
                '<tr>' +
                '<td align="left" bgcolor="#ffffff" style="padding: 24px; font-size: 16px; line-height: 24px;">' +
                '<p style="margin: 0;">Tap the button below to confirm your email address for the registered account in Avantika POS. If you didn&apos;t create an account with <a href="http://pos.avantikain.com">Avantika POS</a>, you can safely delete this email.</p>' +
                '</td>' +
                '</tr>' +
                '<!-- end copy -->' +

                '<!-- start button -->' +
                '<tr>' +
                '<td align="left" bgcolor="#ffffff">' +
                '<table border="0" cellpadding="0" cellspacing="0" width="100%">' +
                '<tr>' +
                '<td align="center" bgcolor="#ffffff" style="padding: 12px;">' +
                '<table border="0" cellpadding="0" cellspacing="0">' +
                '<tr>' +
                '<td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">' +
                '<a href=' + link + ' target="_blank" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Confirm Account</a>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '</td>' +
                '</tr>' +
                '<!-- end button -->' +

                '<!-- start copy -->' +
                '<tr>' +
                '<td align="left" bgcolor="#ffffff" style="padding: 24px; font-size: 16px; line-height: 24px;">' +
                '<p style="margin: 0;">If that doesn&apos;t work, copy and paste the following link in your browser:</p>' +
                '<p style="margin: 0;"><a href=' + link + ' target="_blank"></p>' +
                '</td>' +
                '</tr>' +
                '<!-- end copy -->' +

                '<!-- start copy -->' +
                '<tr>' +
                '<td align="left" bgcolor="#ffffff" style="padding: 24px;font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">' +
                '<p style="margin: 0;">Thank You,<br> TeamAvantika POS</p>' +
                '</td>' +
                '</tr>' +
                '<!-- end copy -->' +

                '</table>' +
                '<!--[if (gte mso 9)|(IE)]>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<![endif]-->' +
                '</td>' +
                '</tr>' +
                '<!-- end copy block -->' +

                '<!-- start footer -->' +
                '<tr>' +
                '<td align="center" bgcolor="#e9ecef" style="padding: 24px;">' +
                '<!--[if (gte mso 9)|(IE)]>' +
                '<table align="center" border="0" cellpadding="0" cellspacing="0" width="600">' +
                '<tr>' +
                '<td align="center" valign="top" width="600">' +
                '<![endif]-->' +
                '<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">' +

                '<!-- start permission -->' +
                '<tr>' +
                '<td align="center" bgcolor="#e9ecef" style="padding: 12px 24px;font-size: 14px; line-height: 20px; color: #666;">' +
                '<p style="margin: 0;">You received this email because we received a request for registration of your account. If you didn&apos;t request for the registration you can safely delete this email.</p>' +
                '</td>' +
                '</tr>' +
                '<!-- end permission -->' +

                '</table>' +
                '<!--[if (gte mso 9)|(IE)]>' +
                '</td>' +
                '</tr>' +
                '</table>' +
                '<![endif]-->' +
                '</td>' +
                '</tr>' +
                '<!-- end footer -->' +

                '</table>' +
                '<!-- end body -->' +

                '</body>' +
                '</html>'
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
                return "error";
            } else {
                console.log("Message sent: " + response.message);
                return "sent";
            }
        });



        //send

        //save link start
        // console.log(mailOptions.link);
      rand1 = rand;
        link1 = "http://" + req.get('host') + "/api/verify?id=" + rand1;
        const verification_link = new Verification_link({


            link: link1 || "No link",
            email: email || "No email id"

        });

        // Save Item in the database
        verification_link.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while storing the link."
                });
            }); // verification link closed 

    }); //mail sent closed
    //end of verification link  
}  