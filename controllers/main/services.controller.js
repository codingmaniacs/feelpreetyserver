const Service = require('../../models/main/service.model.js');
//const Inventory_item = require('../../models/main/inventory_item.model.js');
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
/* new comments    var now = new Date();
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
    var oldPath = req.body.file_path; new comments*/
    // var filename = console.log(oldPath.substring(13));
   /* var filename = */
/*    var newPath = './storage/'+ now.getFullYear().toString()+'/'+now.getMonth().toString()+'/'+now.getDate().toString()+'/' + oldPath.substring(13)
    console.log(newPath);
    fs.rename(oldPath, newPath, function (err) {
    if (err) throw err
    console.log('Successfully  moved!')
    })
*/

    // Create a Item
    const service = new Service({
        category_id: req.body.category_id || "No category Id",
        name: req.body.name || "No product title", 
        description: req.body.description || "No description",
        city_location: req.body.city_location || "No city_location",
//      file_path: newPath || "no file path",
        price: req.body.price || "No price"
       
    });

    // Save Item in the database
    service.save()
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
    Service.find()
    .then(service => {
        res.send(service);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};
exports.getServicesByCategoryID = (req, res) => {
    const category_id = req.params.category_id;
    console.log(category_id);
    Service.find({
        category_id: category_id,
        status: 1
    }).then(services => {
        res.status(200).json({
            
            message: "OK",
            data: services
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
}

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Service.findById(req.params.serviceId)
    .then(service => {
        if(!service) {
            return res.status(404).send({
                message: "service not found with id " + req.params.serviceId
            });            
        }
        res.send(service);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "service not found with id " + req.params.serviceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.serviceId
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
    Service.findByIdAndUpdate(req.params.serviceId, {
        category_id: req.body.category_id || "No category Id",
        name: req.body.name || "No product title", 
        description: req.body.description || "No description",
        price: req.body.price || "No price"
    }, {new: true})
    .then(service => {
        if(!service) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.serviceId
            });
        }
        res.send(service);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.serviceId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.serviceId
        });
    });
};

// Delete a Item with the specified productId in the request
exports.delete = (req, res) => {
    Service.findByIdAndRemove(req.params.serviceId)
    .then(service => {
        if(!service) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.serviceId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.serviceId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.serviceId
        });
    });
};
// exports.getProductsWithInventories = (req, res) => {
    
//     Service.collection.aggregate(
//         {
//             $match:{
//                category_id: req.body.category_id
//             }
//         },{
//             $lookup:
//             {
//                 from: "inventory_items",
//                 localField: "product_id", //autoincrement id
//                 foreignField : "product_id",                
//                 as: "productswithinventories"
//             }
//         },
        
//         {   
//             "$addFields": 
//             {
//                 "productswithinventories": { "$slice": ["$productswithinventories", -1] }
//             }
//         }
//     ).toArray(function(err, docs){
//         console.log(req.body.category_id);
//         console.log(docs);
        
//         var products= [];
//         var products_array= {};
//         docs.forEach(function(values) {
//             products_array["category_id"] = values.category_id;
//             products_array["product_id"] = values.product_id;            
//             products_array["name"] = values.name;
//             products_array["description"] = values.description;
//             products_array["price"] = values.price;
//             products_array["qty"] = values.productswithinventories[0].closing_stock;
            
//             products.push(products_array);
//             products_array = {};         
//         });
        
//         console.log(products);
        
//         //res.json(docs);
//         res.status(200).json({
//             status: true,
//             status_code: 200,
//             message: "OK",                                           
//             data: products
//         });

//      });

//  };

 exports.getServicesByFilter = (req, res) => {
    const category_id = req.body.category_id;
    const service_id = req.body.service_id;
    const location = req.body.location;
    const price = req.body.price;

    console.log(category_id);
    Service.find({ $or: [ { price: { $lt: price } }, { category_id: category_id }, { service_id: service_id } , {city_location: { $regex: '.*' + location + '.*' } } ] }).then(service => {
        res.status(200).json({
            
            message: "OK",
            data: service
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
}
