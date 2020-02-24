const Order = require('../../models/main/orders.model.js');


// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
    Order.find({ status: 1})
    .then(orders => {
        return res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",                                           
            orders: orders
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving orders."
        });
    });
};

// Find a single Category with a categoryId
exports.findOne = (req, res) => {
    Order.findById(req.params.orderId)
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "category not found with id " + req.params.orderId
            });            
        }
        res.send(orders);
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
    Order.findByIdAndUpdate(req.params.orderId, {
        name: req.body.name || "No category name", 
        description: req.body.description || "no category description"
       
    }, {new: true})
    .then(orders => {
        if(!orders) {
            return res.status(404).send({
                message: "category not found with id " + req.params.orderId
            });
        }
        res.send(orders);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "category not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating note with id " + req.params.orderId
        });
    });
};

// Delete a category with the specified categoryId in the request
exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId)
    .then(categories => {
        if(!categories) {
            return res.status(404).send({
                message: "category not found with id " + req.params.orderId
            });
        }
        res.send({message: "category deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "category not found with id " + req.params.orderId
            });                
        }
        return res.status(500).send({
            message: "Could not delete category with id " + req.params.orderId
        });
    });
};

