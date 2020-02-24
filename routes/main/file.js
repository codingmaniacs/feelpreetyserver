const jwt = require('jsonwebtoken');
var express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');

module.exports = (app) => {
    const products = require('../../controllers/main/product.controller.js');
    const Product = require('../../models/main/product.model.js');
    

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            var fs = require('file-system');
            var now = new Date();
            var dir =  "./storage/temp";

            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
               
                
            } 
            

          cb(null, './storage/temp');
        },
        filename: function(req, file, cb) {
          cb(null, new Date().toISOString());
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


    //app.use(morgan("dev"));
    app.use('/uploads', express.static('uploads'));
    //app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(bodyParser.json());
    
    app.post("/files", upload.single('file'), (req, res, next) => {
        
        file : req.file.path 
        
        res.send( req.file.path);
        })

    app.post('/files/multiple',upload.any(),function(req,res,next){
        console.log(req.files);
        res.send(req.files);
        });
    };
   

      
  
    