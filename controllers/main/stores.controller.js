const Store = require('../../models/main/store.model.js');
const Store_otps = require('../../models/main/store_otps.model.js');
const store_user = require('./store_user.controller.js');


//Create new Store
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "store content can not be empty"
        });
    }

    // Create a Store
    const store = new Store({
        
        store_name: req.body.store_name || "No owner name",
        store_address: req.body.store_address || "No store address",
        store_city: req.body.store_city,
        store_state: req.body.store_state || "No phone no",
        store_pincode:req.body.store_pincode || "No phone no",
        store_emailid: req.body.store_emailid || "No store owner address",
        store_phoneno:req.body.store_phoneno || "No store owner address",
        owner_name: req.body.owner_name || "No store owner address",
        owner_address:req.body.owner_address || "No store owner address",
        owner_city: req.body.owner_city || "No store owner_city",
        owner_pincode:req.body.owner_pincode || "No store owner_pincode",
        owner_phoneno: req.body.owner_phoneno || "No store owner_phoneno",
        
       
      
    });

    // Save Store in the database
    store.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the store."
        });
    });
};

// Retrieve all Store from the database.
exports.findAll = (req, res) => {
    Store.find()
    .then(stores => {
        res.send(stores);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving store."
        });
    });
};

// Find a single product with a productId
exports.getStore = (req, res) => {
    Store.findOne({
        store_code: req.body.store_code,
        store_status: 1
    }).then(stores => {
        if(!stores) {
            return res.status(404).send({
                message: "store not found with id " + req.body.store_code
            });            
        }else{
            const otp = Math.floor(Math.random() * 899999 + 100000);
            const exp_date = 1;
            const store_otps = new Store_otps({
                store_id: stores.store_id,
                store_code: stores.store_code,
                store_otp: otp,
                exp_date: exp_date
            });
           // console.log(store_otps);
            Store_otps.findOne({
                store_code: stores.store_code,
                otp_status: 1
            }).then(store_otpsfind => {
                console.log("Test 1" + store_otpsfind);
                if(!store_otpsfind){
                    console.log("Test 2" + store_otpsfind);
                    store_otps.save();
                    return res.status(200).send({
                        status: true,
                        status_code: 200,
                        validate: true,
                        store_name: stores.store_name,
                        store_code: stores.store_code
                    }); 
                }else{
                    console.log("Test 3" + store_otpsfind);
                    Store_otps.findOneAndUpdate({
                        store_code: stores.store_code,
                        otp_status: 1
                    },
                    {
                        store_otp: otp,
                        exp_date: exp_date 
                    },function(err, res){});
                    return res.status(200).send({
                        status: true,
                        status_code: 200,
                        validate: true,
                        store_name: stores.store_name,
                        store_code: stores.store_code
                    });
                }
                
            }).catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "cmsuser not found with id " + req.body.store_code
                    });                
                }
                return res.status(500).send({
                    message: "Something wrong retrieving stores with id " + req.body.store_code
                });
            });               
           }
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "store not found with id " + req.body.store_code
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving store with id " + req.body.store_code
        });
    });
};
// Find a single product with a productId
exports.validate_storeotp = (req, res) => {
    Store_otps.findOne({
        store_code: req.body.store_code,
        store_otp: req.body.store_otp,
        otp_status: 1
    })
    .then(store_otps => {
            const store_otps_update_data = {                
                otp_status: 0,
                updatedAt: Date.now()
            };
            Store_otps.updateOne({store_id: store_otps.store_id, otp_status: 1}, store_otps_update_data, function(err, res) {
                res.modifiedCount;
            });
            
        if(!store_otps) {
            return res.status(404).send({
                message: "store not found with id " + req.body.storeId
            });            
        }else{
            console.log(store_otps);
            //store_user.fetchStoreUsersByStoreID(store_otps.store_id);
            store_user.fetchStoreUsersByStoreID(store_otps.store_code, function(store_users){
                if(!store_users) {                
                    return res.status(404).send({
                        status: false,
                        status_code: 404,
                        message: store_users
                    });            
                }else{
                    //console.log(store_users);
                    return res.status(200).send({
                        status: true,
                        status_code: 200,
                        message: "OK",
                        data: store_users
                    }); 
                }
            });
        }
        //res.send(stores);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "store not found with id " + req.body.storeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving store with id " + req.body.storeId
        });
    });
};

// Update a product
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "store content can not be empty"
        });
    }

    // Find and update product with the request body
    Store.findByIdAndUpdate(req.params.storeId, {
        store_name: req.body.store_name || "No owner name",
        store_address: req.body.store_address || "No store address",
        store_city: req.body.store_city || "No store city",
        store_state: req.body.store_state || "No phone no",
        store_pincode:req.body.store_pincode || "No phone no",
        store_emailid: req.body.store_emailid || "No store owner address",
        store_phoneno:req.body.store_phoneno || "No store owner address",
        owner_name: req.body.owner_name || "No store owner address",
        owner_address:req.body.owner_address || "No store owner address",
        owner_city: req.body.owner_city || "No store owner_city",
        owner_pincode:req.body.owner_pincode || "No store owner_pincode",
        owner_phoneno: req.body.owner_phoneno || "No store owner_phoneno",
        
       

       
    }, {new: true})
    .then(stores => {
        if(!stores) {
            return res.status(404).send({
                message: "store not found with id " + req.params.storeId
            });
        }
        res.send(stores);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "store not found with id " + req.params.storeId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.storeId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Store.findByIdAndRemove(req.params.storeId)
    .then(stores => {
        if(!stores) {
            return res.status(404).send({
                message: "store not found with id " + req.params.storeId
            });
        }
        res.send({message: "store deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "store not found with id " + req.params.storeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete store with id " + req.params.storeId
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
    Store.findByIdAndUpdate(req.params.storeenableId, {        
       status: 1
    }, {new: true})
    .then(stores => {
        if(!stores) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.storeenableId
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
    status: true,
    status_code: 200,
    message: "OK",                                           
    data: stores
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.storeenableId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.storeenableId
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
    Store.findByIdAndUpdate(req.params.storedisableId, {        
        status: 0
    }, {new: true})
    .then(stores => {
        if(!stores) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.storedisableId
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
    status: true,
    status_code: 200,
    message: "OK",                                           
    data: stores
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.storedisableId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.storedisableId
        });
    });
}; 
       