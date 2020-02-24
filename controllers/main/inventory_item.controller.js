const Inventory_item = require('../../models/main/inventory_item.model.js');
//const Order = require('../../models/main/orders.model.js');


//Create new Item
exports.create = (req, res) => {

    if(!req.body) {        
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }
    // documents array
    var opening_stock;
    var stock_purchased = req.body.stock_purchased ;
    var product_id = req.body.product_id ;
    var product_name = req.body.product_name ;
    var store_id = req.body.store_id ;

    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    currentDay = new Date().getDate();
    nextDay = new Date().getDate()+1;
    //console.log(currentYear + '' + currentMonth + '' + currentDay);
  
    Inventory_item.findOne({"createdAt": { $gte: new Date(currentYear, currentMonth, currentDay), $lt: new Date(currentYear, currentMonth, nextDay)}, 'store_id': store_id,'product_id': product_id, 'status': 1  }).then(inventory_items => {
        console.log(inventory_items);
        if (inventory_items == null) {
            console.log('I am here');
            Inventory_item.findOne({ store_id: store_id,product_id: product_id, status: 1  }, { '_id': 0 },  { limit: 1, sort: {$natural:-1} }).exec(function(err, docs) {
                console.log('I am here2');
                if(err) console.log(err);
                const previous_closing_stock = docs.closing_stock;
                //total_stock_purchased = parseInt(docs.stock_purchased) + parseInt(stock_purchased);
                opening_stock = previous_closing_stock;

                const inventory_item = new Inventory_item({
                    store_id: store_id,
                    product_id: product_id || "No item title", 
                    product_name : product_name || "No order qty",
                // attributes : attributes || "No attributes",
                    opening_stock: opening_stock || "No price",
                    stock_purchased: stock_purchased || "No Stalk Purchased",
                    closing_stock: parseInt(opening_stock) - parseInt(stock_purchased)
                });
                
                // Save Item in the database
                // find({ item_id: item_id, store_id: store_id, created_at: Date().now })
                
                inventory_item.save()
            
                .then(data => {
                    res.send(data);
                    console.log(inventory_item)
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Something wrong while creating the product."
                    });
                });

            });
        }else{
            console.log('I am here Update');
            closing_stock = inventory_items.closing_stock;
            total_stock_purchased = parseInt(inventory_items.stock_purchased) + parseInt(stock_purchased);
            console.log(inventory_items);
             //inventory_item.save()
            Inventory_item.findByIdAndUpdate(inventory_items.id, {
                store_id: store_id,
                product_id: product_id || "No item title", 
                product_name : product_name || "No order qty",
               // attributes : attributes || "No attributes",
                stock_purchased: total_stock_purchased || "No Stalk Purchased",
                closing_stock: parseInt(closing_stock) - parseInt(stock_purchased)
            }, {new: true})
            .then(data => {
                 res.send(data);
                 console.log(data)
             }).catch(err => {
                 res.status(500).send({
                     message: err.message || "Something wrong while creating the product."
                 });
             });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
   
   
    
}; 

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    inventory_item.find()
    .then(inventory_item => {
        res.send(inventory_item);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });
    });
};

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Order.findById(req.params.inventoryId)
    .then(inventory_item => {
        if(!inventory_item) {
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
    Product.findByIdAndUpdate(req.params.inventoryId, {
        title: req.body.title || "No product title", 
        description: req.body.description,
        price: req.body.price,
        attributes: req.body.attributes,
        company: req.body.company
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.inventoryId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.inventoryId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.inventoryId
        });
    });
};

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

