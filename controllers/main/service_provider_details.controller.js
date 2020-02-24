const Service_provider_details = require('../../models/main/service_provider_details.model.js');
//const Inventory_item = require('../../models/main/inventory_item.model.js');


//Create new Item
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    const service_details = req.body;
    var service_details1 = [];
    var service_details_array = {};
    // Create a Item
    service_details.forEach(function(value2) {
   
       
        service_details_array["service_provider_id"] = value2.service_provider_id,
        service_details_array["service_id"] = value2.service_id,
        service_details_array["price"] = value2.price,
        service_details_array["status"] = 1,
        service_details1.push(service_details_array);
        service_details_array = {};
     //   service_provider_details_id: req.body.service_provider_details_id || "No service_provider_details_id", 
        // service_provider_id: req.body.service_provider_id || "No service_provider_id",
        // service_id: req.body.service_id || "No service_id",
        // price: req.body.price || "No price"
        
       
    
    })
    // Save Item in the database
    Service_provider_details.collection.insertMany(service_details1, { forceServerObjectId: true }, function (err, docs) {
        if (err){ 
            return console.error(err);

        } else {
            return res.status(200).json({               
                message: "OK",
                data: docs
            });

        }
    });


}




// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    Service_provider_details.find()
    .then(service_provider_details => {
        res.send(service_provider_details);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving service_reviews."
        });
    });
};
exports.getServiceproviderdetailsByServiceproviderID = (req, res) => {
    const service_provider_id = req.body.service_provider_id;
    console.log(service_provider_id);
    Service_provider_details.find({
        service_provider_id: service_provider_id,
        status: 1
    }).then(service_provider_details => {
        res.status(200).json({
            
            message: "OK",
            data: service_provider_details
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving service_reviews."
        });
    });
}

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Service_provider_details.findById(req.params.service_provider_details_id)
    .then(service_provider_details => {
        if(!service_provider_details) {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_details_id
            });            
        }
        res.send(service_provider_details);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_details_id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving company with id " + req.params.service_provider_details_id
        });
    });
};

// Update a Item
/*
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update Item with the request body
    Company.findByIdAndUpdate(req.params.companyId, {
        name: req.body.name || "No company name", 
        description: req.body.description || "No company description",
        address: req.body.address || "No address",
        company_owner: req.body.company_owner || "No company_owner"
       
    }, {new: true})
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });
        }
        res.send(company);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating company with id " + req.params.companyId
        });
    });
};
*/
// Delete a Item with the specified productId in the request
exports.delete = (req, res) => {
    Service_provider_details.findByIdAndRemove(req.params.service_provider_details_id)
    .then(service_provider_details => {
        if(!service_provider_details) {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_details_id
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_details_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.service_provider_details_id
        });
    });
};
