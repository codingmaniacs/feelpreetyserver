const jwt = require('jsonwebtoken');
var express = require('express');

//const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');



  

module.exports = (app) => {
    const categories = require('../../controllers/main/categories.controller.js');
    const categoriesdatatables = require('../../controllers/main/categories_datatables.controller.js');
    const Category = require('../../models/main/category.model.js');
   /* app.use(function(req, res, next){
        // route middleware to verify a token
        // check header or url parameters or post parameters for token
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var token = req.headers['token'].split(" ")[1];
        console.log(token.split(" ")[1]);
        
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
    }); */
    // Create a new Product
    const storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, './storage/uploads/categories/');
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
  
    app.post('/categories', categories.create);

    // Retrieve all Products
    app.get('/categories', categories.findAll);

    // Retrieve a single Product with productId
    app.get('/categories_with_products', categories.getProductsWithCategories);

    // Retrieve a single Product with productId
    app.get('/categories/:categoryId', categories.findOne);

    // Update a Note with productId
    app.put('/categories/:categoryId', categories.update);

    // Delete a Note with productId
    app.delete('/categories/:categoryId', categories.delete);
    app.get('/all_categories', categories.findallcategories);
    //datatables 
   
    app.get('/',function(req, res) {
    res.sendFile(path.join(__dirname + '/view/index.html'));
    });

    app.put('/categories_enable/:categoryenableId', categories.enableById);
    app.put('/categories_disable/:categorydisableId', categories.disableById);

app.post('/get_Categories_datatables',categoriesdatatables.get_Categories_datatables);
app.post('/getCategoriesdatatables',categories.get_Categories_datatables);

    //app.use(morgan("dev"));
    app.use('/uploads', express.static('uploads'));
    //app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(bodyParser.json());
    
   /* app.post("/categories", upload.single('categoryImage'), (req, res, next) => {
    const category = new Category({
     // _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      description: req.body.description,
      file_path: req.file.path 
    });
    category.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created category successfully",
          createdcategory: {
              name: result.name,
              description: result.description,
              _id: result._id,
              request: {
                  type: 'GET',
                  url: "http://localhost:4002/api/categories/" + result._id
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
