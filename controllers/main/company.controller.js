const Company = require('../../models/main/company.model.js');
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
    const company = new Company({
        
        name: req.body.name || "No company name", 
        description: req.body.description || "No company description",
        address: req.body.address || "No address",
        company_owner: req.body.company_owner || "No company_owner"
       
    });

    // Save Item in the database
    company.save()
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
    Company.find()
    .then(companies => {
        res.send(companies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving companies."
        });
    });
};
exports.getCompaniesByCompanyID = (req, res) => {
    const company_id = req.params.company_id;
    console.log(company_id);
    Company.find({
        company_id: company_id,
        status: 1
    }).then(companies => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: companies
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving companies."
        });
    });
}

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Company.findById(req.params.companyId)
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
            message: "Something wrong retrieving company with id " + req.params.companyId
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

// Delete a Item with the specified productId in the request
exports.delete = (req, res) => {
    Company.findByIdAndRemove(req.params.companyId)
    .then(company => {
        if(!company) {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "company not found with id " + req.params.companyId
            });                
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.companyId
        });
    });
};
