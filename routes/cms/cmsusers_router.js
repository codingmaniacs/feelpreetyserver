var express = require('express');
var nodemailer = require("nodemailer");
var app = express();


module.exports = (app) => {


        /*
        	Here we are configuring our SMTP Server details.
        	STMP is mail server which is responsible for sending and recieving email.
        */
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "ranjit@avantikain.com",
                pass: "aiplglobal"
            }
        });
        var rand, mailOptions, host, link;
        /*------------------SMTP Over-----------------------------*/

        /*------------------Routing Started ------------------------*/
      

        const cmsusers = require('../../controllers/cms/cmsusers_controller.js');

        //app.get('/cmsusers', function(req, res) {
        //res.sendfile('../../routes/cms/index.html');
        //});

        /* app.get('/cmsusers', function(req, res) {
             res.send('WELCOME TO CMS USERS...');
         });*/
        app.post('/cmsusers', cmsusers.create); // Create a new cmsusers
        app.get('/cmsusers/getall', cmsusers.findAll); // Retrieve all cmsusers
        app.get('/cmsusers/getone/:cmsuserId', cmsusers.findOne); // Retrieve a single cmsusers with cmsuserId
        app.put('/cmsusers/update/:cmsuserId', cmsusers.update); // Update a cmsusers with cmsuserId
        app.post('/cmsusers/changepass/', cmsusers.updatepass); // Update a cmsusers with cmsuserId
        app.delete('/cmsusers/delete/:cmsuserId', cmsusers.delete); // Delete a cmsusers with cmsuserId
        app.delete('/cmsusers/deleteall/', cmsusers.deleteall); // Delete a cmsusers with cmsuserId
        app.post('/cmsusers/login', cmsusers.loginme); // For Testing
        app.post('/cmsusers/test', cmsusers.testjwt); // For Testing
        app.post('/cmsusers/resendVerificationMail', cmsusers.resendemail);
        app.get('/verify-email/:id', cmsusers.verifyemail);
        app.post('/cmsusers/forgot_password', cmsusers.forgotPassword);
    }
    /*--------------------Routing Over----------------------------*/