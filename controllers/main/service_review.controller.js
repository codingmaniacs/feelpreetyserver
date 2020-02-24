const Service_review = require('../../models/main/service_review.model.js');
//const Inventory_item = require('../../models/main/inventory_item.model.js');


//Create new Item
exports.create = (req, res) => {
    // Request validation
    if(!req.body) {
        
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Create a Item
    const service_review = new Service_review({
        
        service_id: req.body.service_id || "No service_id", 
        star: req.body.star || "No star",
        user_id: req.body.user_id || "No user_id"
       
    });

    // Save Item in the database
    service_review.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while creating the multiple."
        });
    });
};

// Retrieve all Item from the database.
exports.findAll = (req, res) => {
    Service_review.find()
    .then(service_reviews => {
        res.send(service_reviews);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving service_reviews."
        });
    });
};
exports.getServicereviewByServiceID = (req, res) => {
    const service_id = req.params.service_id;
    console.log(service_id);
    Service_review.find({
        service_id: service_id,
        status: 1
    }).then(service_reviews => {
        res.status(200).json({
            
            message: "OK",
            data: service_reviews
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving service_reviews."
        });
    });
}

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Service_review.findById(req.params.service_review_id)
    .then(service_reviews => {
        if(!service_reviews) {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_review_id
            });            
        }
        res.send(service_reviews);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_review_id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving company with id " + req.params.service_review_id
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
    Service_review.findByIdAndRemove(req.params.service_review_id)
    .then(service_reviews => {
        if(!service_reviews) {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_review_id
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_review_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.service_review_id
        });
    });
};
