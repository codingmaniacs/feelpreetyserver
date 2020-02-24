const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Store_users = require('../../models/main/store_users.model.js');
const Category = require('../../models/main/category.model.js');
const Stores = require('../../models/main/store.model.js');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



//Create new Store user
exports.create = (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body);

        if(!isValid) {
            return res.status(201).json(errors);
        }
        Store_users.findOne({
            emailid: req.body.emailid
        }).then(user => {
            
            if(user) {
                return res.status(201).json({
                    status: false,
                    status_code: 201,
                    email: 'Email already exists'
                });
            }else {
                //console.log(user);
                const avatar = gravatar.url(req.body.emailid, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new Store_users({
        
                    store_id: req.body.store_id || "No store_id",
                    name: req.body.name || "No user_name",
                    user_name: req.body.user_name || "No user_name",
                    password: req.body.password || "No store user_phoneno",
                    address: req.body.address || "No user_address",
                    city: req.body.city || "No user_city",
                    state:req.body.state || "No user_state",
                    pincode: req.body.pincode || "No store user_pincode",
                    emailid:req.body.emailid || "No store user_emailid",
                    phoneno: req.body.phoneno || "No store user_phoneno",
                    
                    avatar
                });
                
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) console.error('There was an error', err);
                    else {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) console.error('There was an error', err);
                            else {
                                newUser.password = hash;
                                console.log(newUser);
                                newUser.save().then(user => {
                                    return res.status(200).json({
                                        status: true,
                                        status_code: 200,
                                        message: "OK",
                                        data: user
                                    });
                                    
                                }).catch(err => {
                                    res.status(500).send({
                                        message: err.message || "Something wrong while creating the store users."
                                    });
                                });
                            }
                        });
                    }
                });
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the store users."
            });
        });


    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "store users content can not be empty"
        });
    }
};

    // Create a Store users
  /*  const store_users = new Store_users({
        
        store_pkid: req.body.store_pkid || "No store_pkid",
        user_name: req.body.user_name || "No user_name",
        user_address: req.body.user_address || "No user_address",
        user_city: req.body.user_city || "No user_city",
        user_state:req.body.user_state || "No user_state",
        user_pincode: req.body.user_pincode || "No store user_pincode",
        user_emailid:req.body.user_emailid || "No store user_emailid",
        user_phoneno: req.body.user_phoneno || "No store user_phoneno",
      
    }); 
    console.log(req.body);
    // Save Store users in the database
    store_users.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the store users."
        });
    });
};
*/

// Retrieve all Store from the database.
exports.getAllStoreUsers = (req, res) => {
    Store_users.find()
    .then(store_users => {
        res.send(store_users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving store."
        });
    });
};

// Find a single product with a productId
exports.fetchStoreUsersByStoreID = (req, res) => {
    const store_code = req;
    //console.log(req);
    Stores.findOne({
        store_code: store_code
    }).then(stores => {
        console.log(stores.store_id);
        Store_users.find({            
            store_id: stores.store_id
        }).then(store_users => {
            console.log(store_users);
            if(!store_users) {                
                return res("store not found with id " + store_code);            
            }else{
                console.log(store_users);
                return res(store_users);
            }
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res("store not found with id " + store_code);              
            }else{
                return res("Something wrong retrieving store with id " + store_code);
            }
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res("No records found with store id " + store_code);           
        }else{
            return res("Something went wrong in retrieving stores " + store_code);
        }
    });
};
exports.getStoreUsersByStoreID = (req, res) => {
    //console.log(req.body);
    this.fetchStoreUsersByStoreID(req.body.store_code, function(store_users){
        if(!store_users) {                
            return res.status(404).send({
                status: false,
                status_code: 404,
                message: "no store users",
                message: store_users
            });            
        }else{
            //console.log(store_users);
            return res.status(200).send({
                status: true,
                status_code: 200,
                message: "ok",
                data: store_users
            }); 
        }
    });
};
exports.login =  (req, res, next) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const user_name = req.body.user_name;
    const password = req.body.password;

    Store_users.findOne({user_name: user_name})
        .then(store_users => {
            console.log(store_users);
            if(!store_users) {
                errors.user_name = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, store_users.password)
                    .then(isMatch => {
                        if(isMatch) {
                            const payload = {
                                id: store_users.id,
                                store_id: store_users.store_id,
                                name: store_users.name,
                                avatar: store_users.avatar
                            }
                            jwt.sign(payload, 'secret', {
                                expiresIn: 3600
                            }, (err, token) => {
                                if(err) console.error('There is some error in token', err);
                                else {
                                    Category.find({ status: 1})
                                    .then(categories => {
                                        console.log(categories);
                                        return res.status(200).json({
                                            status: true,
                                            status_code: 200,
                                            message: "OK",
                                            token: `Bearer ${token}`,                                            
                                            user_details: store_users
                                            
                                            
                                        });
                                    }).catch(err => {
                                        res.status(500).send({
                                            message: err.message || "Something wrong while retrieving category."
                                        });
                                    });
                                    
                                }
                            });
                        }
                        else {
                            errors.password = 'Incorrect Password';
                            return res.status(400).json(errors);
                        }
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Incorrect Password"
                        });
                    });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while login the store users."
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
    Store_users.findByIdAndUpdate(req.params.store_pkid, {
       
       
        store_pkid: req.body.store_pkid || "No store_pkid",
        name: req.body.name || "No user_name",
        user_name: req.body.user_name || "No user_name",
        password: req.body.password || "No store user_phoneno",
        address: req.body.address || "No user_address",
        city: req.body.city || "No user_city",
        state:req.body.state || "No user_state",
        pincode: req.body.pincode || "No store user_pincode",
        emailid:req.body.emailid || "No store user_emailid",
        phoneno: req.body.phoneno || "No store user_phoneno",
        
       

       
    }, {new: true})
    .then(store_users => {
        if(!store_users) {
            return res.status(404).send({
                message: "store not found with id " + req.params.store_pkid
            });
        }
        res.send(store_users);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "store not found with id " + req.params.store_pkid
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.store_pkid
        });
    });
};

// Delete a store_user with the specified store_pkid in the request
exports.delete = (req, res) => {
    Store_users.findByIdAndRemove(req.params.store_pkid)
    .then(store_users => {
        if(!store_users) {
            return res.status(404).send({
                message: "store not found with id " + req.params.store_pkid
            });
        }
        res.send({message: "store deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "store not found with id " + req.params.store_pkid
            });                
        }
        return res.status(500).send({
            message: "Could not delete store with id " + req.params.store_pkid
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
    Store_users.findByIdAndUpdate(req.params.storeuserenableId, {        
       status: 1
    }, {new: true})
    .then(store_users => {
        if(!store_users) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.storeuserenableId
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
    data: store_users
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.storeuserenableId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.storeuserenableId
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
    Store_users.findByIdAndUpdate(req.params.storeuserdisableId, {        
        status: 0
    }, {new: true})
    .then(store_users => {
        if(!store_users) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.storeuserdisableId
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
    data: store_users
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.storeuserdisableId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.storeuserdisableId
        });
    });
}; 
