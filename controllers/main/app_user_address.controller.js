const App_user_address = require('../../models/main/app_user_address.model.js');


//Create new Store
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "store content can not be empty"
        });
    }

    // Create a Store
    const app_user_address = new App_user_address({
        
        app_user_id: req.body.app_user_id || "No app_user_id",
        user_address_type: req.body.user_address_type || "No app_user_id",
        user_address: req.body.user_address || "No app_user_address",
        user_city: req.body.user_city,
        user_state: req.body.user_state || "No app_user_state",
        user_pincode:req.body.user_pincode || "No app_user_pincode",
         
    });

    // Save Store in the database
    app_user_address.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the app_user_address."
        });
    });
};

// Retrieve all Store from the database.
exports.findAll = (req, res) => {
    App_user_address.find()
    .then(app_user_address => {
        res.send(app_user_address);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving app_user_address."
        });
    });
};


exports.getAddressbyappuserID = (req, res) => {
    const app_user_id = req.params.app_user_id;
    console.log(app_user_id);
    App_user_address.find({
        app_user_id: app_user_id,
        status: 1
    }).then(app_user_address => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: app_user_address
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving bookings."
        });
    });
}


// Find a single product with a productId

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    App_user_address.findByIdAndRemove(req.params.app_user_id)
    .then(app_user_address => {
        if(!app_user_address) {
            return res.status(404).send({
                message: "app user address not found with id " + req.params.app_user_id
            });
        }
        res.send({message: "app user address deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "store not found with id " + req.params.app_user_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete app user with id " + req.params.app_user_id
        });
    });
};

exports.enableById = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "app user content can not be empty"
        });
    }

    // Find and update Item with the request body
    App_user_address.findByIdAndUpdate(req.params.app_user_id, {        
       status: 1
    }, {new: true})
    .then(app_user_address => {
        if(!app_user_address) {
            return res.status(404).send({
                message: "app user not found with id " + req.params.app_user_id
            });
        }
 
return res.status(200).json({
    status: true,
    status_code: 200,
    message: "OK",                                           
    data: app_user_address
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "address not found with id " + req.params.app_user_id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating address with id " + req.params.app_user_id
        });
    });
}; 
   
exports.disableById = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "address content can not be empty"
        });
    }

    // Find and update Item with the request body
    App_user_address.findByIdAndUpdate(req.params.app_user_id, {        
        status: 0
    }, {new: true})
    .then(app_user_address => {
        if(!app_user_address) {
            return res.status(404).send({
                message: "rcategory not found with id " + req.params.app_user_id
            });
        }
   
return res.status(200).json({
    status: true,
    status_code: 200,
    message: "OK",                                           
    data: app_user_address
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categories not found with id " + req.params.app_user_id
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating categories with id " + req.params.app_user_id
        });
    });
}; 
       