const jwt = require('jsonwebtoken');
var express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');

module.exports = (app) => {
    const products = require('../../controllers/main/product.controller.js');
    const productsdatatables = require('../../controllers/main/product_datatables.controller.js');
    const Product = require('../../models/main/product.model.js');
    /*app.use(function(req, res, next){
        // route middleware to verify a token
        // check header or url parameters or post parameters for token
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var token = req.headers['token'].split(" ")[1];
        //console.log(token.split(" ")[1]);
        
        // decode token
        if (token) {
    
            // verifies secret and checks exp
            jwt.verify(token, 'secret', function(err, decoded) {       
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: 'Failed to authenticate token.' });       
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
    
        } else {    
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });    
        }
    }); 
    */
    // Create a new Product
    //app.post('/products', products.create);

    // Retrieve all Products

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
         /*   var fs = require('file-system');
            var now = new Date();
            var dir =  now.getFullYear();
            var dir1 = now.getMonth();
            var dir2 = now.getDate();
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
                if (!fs.existsSync(dir1)){
                    fs.mkdirSync(dir1);
                    if (!fs.existsSync(dir2)){
                        fs.mkdirSync(dir2);
                        
                    }
                }
                
            } */
            
            
          //  var path = "./uploads/products/" + dir + "/" + dir1 + "/" + dir2;
/*
            var year_folder = path + Date("Y");
            var month_folder = year_folder + "/" + Date("m");

            !file_exists(year_folder) && mkdir(year_folder , 0777);
            !file_exists(month_folder) && mkdir(month_folder, 0777);

            path = month_folder + "/"+  new_file_name; */
          cb(null, './storage/uploads/products/');
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

    app.post('/products', products.create);
    app.get('/products', products.findAll);

    //app.get('/categories_with_products2', products.getProductsWithCategories2);
    
    // Retrieve a single Product with productId
    app.get('/products/:category_id', products.getProductsByCategoryID);

    // Retrieve a single Product with productId
    app.get('/products/:productId', products.findOne);

    // Update a Note with productId
    app.put('/products/:productId', products.update);

    app.post('/products_byfilter/', products.getProductsByFilter);

    // Delete a Note with productId
    app.delete('/products/:productId', products.delete);
    app.post('/products_with_inventories', products.getProductsWithInventories);

    app.post('/getProductsdatatables',productsdatatables.getProductsdatatables);

    //app.use(morgan("dev"));
    app.use('/uploads', express.static('uploads'));
    //app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(bodyParser.json());
  
   /* app.post("/products", upload.single('productImage'), (req, res, next) => {
    const product = new Product({
     // _id: new mongoose.Types.ObjectId(),
     category_id: req.body.category_id || "No category Id",
     name: req.body.name || "No product title", 
     description: req.body.description || "No description",
     price: req.body.price || "No price",
     productImage: req.file.path 
    });
    product.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdproduct: {
              name: result.name,
              description: result.description,
              price: result.price,
              path: result.productImage,
              request: {
                  type: 'GET',
                  url: "http://localhost:4002/api/products/" + result._id
              }
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }); */
}