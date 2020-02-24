const Product = require('../../models/main/product.model.js');
const Inventory_item = require('../../models/main/inventory_item.model.js');
var multer = require('multer');

var fs = require('file-system');

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


//Create new Item
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Product content can not be empty"
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
    var oldPath = req.body.file_path;
    // var filename = console.log(oldPath.substring(13));
   /* var filename = */
    var newPath = './storage/'+ now.getFullYear().toString()+'/'+now.getMonth().toString()+'/'+now.getDate().toString()+'/' + oldPath.substring(13)
    console.log(newPath);
    fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
    console.log('Successfully  moved!')
    })


    // Create a Item
    const product = new Product({
        category_id: req.body.category_id || "No category Id",
        name: req.body.name || "No product title", 
        description: req.body.description || "No description",
        file_path: newPath || "no file path",
        price: req.body.price || "No price"
       
    });

    // Save Item in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the product."
        });
    });
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};
exports.getProductsByCategoryID = (req, res) => {
    const category_id = req.params.category_id;
    console.log(category_id);
    Product.find({
        category_id: category_id,
        status: 1
    }).then(products => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: products
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
}

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Product.findById(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });            
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.productId
        });
    });
};

// Update a Item
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update Item with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        category_id: req.body.category_id || "No category Id",
        name: req.body.name || "No product title", 
        description: req.body.description || "No description",
        price: req.body.price || "No price"
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.productId
        });
    });
};

// Delete a Item with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};
exports.getProductsWithInventories = (req, res) => {
    
    Product.collection.aggregate(
        {
            $match:{
               category_id: req.body.category_id
            }
        },{
            $lookup:
            {
                from: "inventory_items",
                localField: "product_id", //autoincrement id
                foreignField : "product_id",                
                as: "productswithinventories"
            }
        },
        
        {   
            "$addFields": 
            {
                "productswithinventories": { "$slice": ["$productswithinventories", -1] }
            }
        }
    ).toArray(function(err, docs){
        console.log(req.body.category_id);
        console.log(docs);
        
        var products= [];
        var products_array= {};
        docs.forEach(function(values) {
            products_array["category_id"] = values.category_id;
            products_array["product_id"] = values.product_id;            
            products_array["name"] = values.name;
            products_array["description"] = values.description;
            products_array["price"] = values.price;
            products_array["qty"] = values.productswithinventories[0].closing_stock;
            
            products.push(products_array);
            products_array = {};         
        });
        
        console.log(products);
        
        //res.json(docs);
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",                                           
            data: products
        });

     });

 };

 exports.getProductsByFilter = (req, res) => {
    const category_id = req.body.category_id;
    const product_id = req.body.product_id;
    const price = req.body.price;

    console.log(category_id);
    Product.find({ $or: [ { price: { $lt: price } }, { category_id: category_id }, { product_id: product_id } ] }).then(products => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: products
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
}
