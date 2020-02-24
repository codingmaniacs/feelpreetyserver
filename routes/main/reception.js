const jwt = require('jsonwebtoken');
var express = require('express');

//const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');





module.exports = (app) => {
    const reception = require('../../controllers/main/reception.controller.js');


    app.get('/reception/lunch', reception.lunch);
    app.get('/reception/dinner', reception.dinner);
    app.get('/reception/findall', reception.findAll);
    app.get('/reception/findallnext', reception.findAllNext);
   // app.post('/reception/get_code_details', reception.getCodeDetails);
    //app.post('/reception/get_code_details_l_b', reception.getCodeDetailslunchbreakfast);
    app.post('/reception/get_code_details_count', reception.getCodeDetailscount);
    app.post('/reception/update', reception.update);
    app.post('/reception/updatemany', reception.updatemany);
    app.post('/reception/get-code-details', reception.getCodeDetailslunchbreakfastdinner);

}
