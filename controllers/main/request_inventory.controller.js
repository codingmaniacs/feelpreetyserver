const Request_inventory = require('../../models/main/request_inventory.model.js');
const Inventory_item = require('../../models/main/inventory_item.model.js');
//const Order = require('../../models/main/orders.model.js');


//Create new request_inventory
exports.createreq = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Inventory content can not be empty"
        });
    }

    // Create a new inventories
    const request_inventory = new Request_inventory({
        store_id: 1 || "No store_id", 
        product_id: req.body.product_id || "No product_id",
        stock_request: req.body.stock_request || "No stock_request"
        
      
    });
    
    // Save Category in the database
    request_inventory.save()
    .then(data => {
        console.log(data);
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",                                           
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the request for inventory."
        });
    });
};


// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    Request_inventory.find()
    .then(request_inventory => {
        res.send(request_inventory);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Request_inventory.findById(req.params.inventoryId)
    .then(request_inventory => {
        if(!request_inventory) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.inventoryId
            });            
        }
        res.send(order_detail);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.inventoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving product with id " + req.params.inventoryId
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
    Request_inventory.findByIdAndUpdate(req.params.reqinventoryId, {        
        status: 1
    }, {new: true})
    .then(request_inventory => {
        if(!request_inventory) {
            return res.status(404).send({
                message: "request_inventory not found with id " + req.params.reqinventoryId
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
        res.send(request_inventory);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "request_inventory not found with id " + req.params.reqinventoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating request_inventory with id " + req.params.reqinventoryId
        });
    });
}; 

exports.approvereqByreqId = (req, res) => {
    const req_inv_item = req.body.reqinventoryId;
    Request_inventory.findOneAndUpdate({ req_inventory_id : req_inv_item }, {$set:{"status": 1}},function(err, doc){
        if(err){
            console.log(err);
            res.status(201).json({
                status: false,
                status_code: 201,
                message: "Already Approved",                                           
                data: err
            });
        }else {
            if(doc != null){

                console.log(doc);
                Inventory_item.findOne({ store_id: 1, product_id: doc.product_id, status: 1  }, { '_id': 0 },  { limit: 1, sort: {$natural:-1} }).exec(function(err, docs) {
                    if(err){
                        console.log("Something wrong when updating data!");
                    }else {
                        console.log(docs);
                        var updated_closing_stock = parseInt(docs.closing_stock) + parseInt(doc.stock_request);
                        Inventory_item.findOneAndUpdate({ inventory_item_id : docs.inventory_item_id }, {$set:{"closing_stock": updated_closing_stock}}, {new: true}, function(err, doc){
                            if(err){
                                console.log(err);
                            }else{
                                //console.log(doc);
                                res.status(200).json({
                                    status: true,
                                    status_code: 200,
                                    message: "OK",                                           
                                    data: doc
                                });
                            }
                            
                        });
                    }
                    
                });       
            }else{
                console.log(doc);
                res.status(201).json({
                    status: false,
                    status_code: 201,
                    message: "Records not found !!!",                                           
                    data: doc
                });
            }
            
        }
        
    });
}
// Delete a Item with the specified productId in the request
exports.delete = (req, res) => {
    Order_detail.findByIdAndRemove(req.params.inventoryId)
    .then(order_detail => {
        if(!order_detail) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.inventoryId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.Id
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.inventoryId
        });
    });
};
exports.fetchInventoryBydate = (req, res) => {
    const date = req;
    
    Inventory_item.findOne({
        date: date
    }).then(inventory_item => {
        console.log(inventory_item);
        Inventory_item.find({
            date: date
        }).then(inventory_item => {
            
            if(!inventory_item) {                
                return res("inventory_item not found with date");            
            }else{
                console.log(inventory_item);
                return res(inventory_item);
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res("inventory_item not found with id ");              
            }else{
                return res("Something wrong retrieving inventory_item with id ");
            }
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res("No records found with store id " + store_id);           
        }else{
            return res("Something went wrong in retrieving stores " + store_id);
        }
    });
};

exports.createinventories = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Inventory content can not be empty"
        });
    }

    // Create a new inventories
    const inventory_item = new Inventory_item({
        store_id: req.body.store_id || "No store_id", 
        product_id: req.body.product_id || "No product_id",
        product_name: req.body.product_name || "No category name", 
        opening_stock: req.body.opening_stock || "No category name", 
        stock_purchased: req.body.stock_purchased || "No category description",
        closing_stock: req.body.closing_stock || "No category name"
        
      
    });
    
    // Save Category in the database
    inventory_item.save()
    .then(data => {
        console.log(data);
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the category."
        });
    });
};

