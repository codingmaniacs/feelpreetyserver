const Category = require('../../models/main/category.model.js');
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


//Create new Category
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "category content can not be empty"
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
 var oldPath = req.body.file_path;
 
 // var filename = console.log(oldPath.substring(13));
/* var filename = */
var newPath = './storage/'+ now.getFullYear().toString()+'/'+now.getMonth().toString()+'/'+now.getDate().toString()+'/' + oldPath.substring(13);

console.log(newPath);

 fs.rename(oldPath, newPath, function (err) {
 if (err) throw err
 console.log('Successfully  moved!')
 })

    // Create a Category
    const category = new Category({
        name: req.body.name || "No category name", 
        description: req.body.description || "No category description",
        file_path: newPath || "no file path"
      
    });
    
    // Save Category in the database
    category.save()
    .then(data => {
        console.log(data);
        res.status(200).json({
                        
                        message: "OK",
                        data: data
                       
                    });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the category."
        });
    }); 

   
        
     
      };
   


// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    Category.find({ status: 1})
    .then(categories => {
        return res.status(200).json({
            message: "OK",                                           
            categories: categories
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving category."
        });
    });
};

// Find a single Category with a categoryId
exports.findOne = (req, res) => {
    Category.findById(req.params.categoryId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });            
        }
        res.send(categories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving category with id " + req.params.categoryId
        });
    });
};

// Update a Category
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "category content can not be empty"
        });
    }

    // Find and update Category with the request body
    Category.findByIdAndUpdate(req.params.categoryId, {
        name: req.body.name || "No category name", 
        description: req.body.description || "no category description"
       
    }, {new: true})
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send(categories);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.categoryId
        });
    });
};



exports.enableById = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update Item with the request body
    Category.findByIdAndUpdate(req.params.categoryenableId, {        
        status: 1
    }, {new: true})
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.categoryenableId
            });
        }
    /*    
         Request_inventory.collection.aggregate(
        {
            $match:{
               product_id: req.body.product_id
            }
        },{
            $lookup:
            {
                from: "inventory_items",
                localField: "product_id", //autoincrement id
                foreignField : "product_id",                
                as: "inventoriesrequest"
            }
        },
        
        {   
            "$addFields": 
            {
                "inventoriesrequest": { "$slice": ["$inventoriesrequest", -1] }
            }
        }
    ).toArray(function(err, docs){
        console.log(req.body.category_id);
        console.log(docs);
*/
return res.status(200).json({
    
    message: "OK",                                           
    data: categories
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.categoryenableId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.categoryenableId
        });
    });
}; 
   
exports.disableById = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update Item with the request body
    Category.findByIdAndUpdate(req.params.categorydisableId, {        
        status: 0
    }, {new: true})
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.categorydisableId
            });
        }
    /*    
         Request_inventory.collection.aggregate(
        {
            $match:{
               product_id: req.body.product_id
            }
        },{
            $lookup:
            {
                from: "inventory_items",
                localField: "product_id", //autoincrement id
                foreignField : "product_id",                
                as: "inventoriesrequest"
            }
        },
        
        {   
            "$addFields": 
            {
                "inventoriesrequest": { "$slice": ["$inventoriesrequest", -1] }
            }
        }
    ).toArray(function(err, docs){
        console.log(req.body.category_id);
        console.log(docs);
*/
return res.status(200).json({
   
    message: "OK",                                           
    data: categories
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.categorydisableId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.categorydisableId
        });
    });
}; 
       




// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.categoryId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });
        }
        res.send({message: "category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "category not found with id " + req.params.categoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.categoryId
        });
    });
};

exports.getProductsWithCategories = (req, res) => {
    Category.collection.aggregate([
        {
            $lookup:
            {
                from: "products",
                localField: "cat_id", //autoincrement id
                foreignField : "category_id",
                as: "products"
                
            }
        }
    ]).toArray(function(err, docs){
        console.log(docs);
        //res.json(docs);
        res.status(200).json({
           
            message: "OK",                                           
            categories: docs
        });

     });
 };
//gives all categories with status 0 and 1
exports.findallcategories = (req, res) => {
    Category.find()
    .then(categories => {
        return res.status(200).json({
            
            message: "OK",                                           
            data: categories
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};
// With Datatables
exports.get_Categories_datatables = function (req, res) {
    //console.log(req.body.search.value);
    var searchStr = req.body.search.value;
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'name': regex},{'description': regex }] };
    }else{
        searchStr={};
    }
    var sort_data;
    const column = ['_id','name','description'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            '_id': orderDir
        }
        break;
        case '1': sort_data = {
            'name': orderDir
        }
        break;
        case '2': sort_data = {
            'description': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;

    Category.countDocuments({}, function(err, c) {
        recordsTotal=c;
        //console.log('Search String : ' + searchStr);
        Category.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            
            console.log(req.body.start);
            console.log(req.body.length);
            Category.find(searchStr, '_id name status description', {'skip': Number( req.body.start), 'limit': Number(req.body.length) , 'sort': sort_data }, function (err, results) {
                if (err) {
                    console.log('error while getting results'+err);
                    return;
                }
        
                var data = JSON.stringify({
                    "draw": req.body.draw,
                    "recordsFiltered": recordsFiltered,
                    "recordsTotal": recordsTotal,
                    "data": results
                });
                res.send(data);
            });
        
          });
   });

     


    
  

    


};

