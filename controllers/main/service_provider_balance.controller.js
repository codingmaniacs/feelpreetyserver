const Service_provider_balance = require('../../models/main/service_provider_balance.model.js');
const Booking = require('../../models/main/bookings.model.js');
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
    const service_provider_balance = new Service_provider_balance({
        
        service_provider_id: req.body.service_provider_id || "No service_id", 
        debit_amount: req.body.debit_amount || "No star",
        credit_amount: req.body.credit_amount || "No user_id",
        balance_amount: req.body.balance_amount || "No user_id"
       
    });

    // Save Item in the database
    service_provider_balance.save()
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
    Service_provider_balance.find()
    .then(service_provider_balance => {
        res.send(service_provider_balance);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving service_reviews."
        });
    });
};
exports.getBalanceByServiceproviderID = (req, res) => {
    const service_provider_id = req.params.service_provider_id;
    console.log(service_provider_id);
    Service_provider_balance.find({
        service_provider_id: service_provider_id,
        status: 1
    }).then(service_provider_balance => {
        res.status(200).json({
            message: "OK",
            data: service_provider_balance
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving service_reviews."
        });
    });
}

// Find a single Item with a productId
exports.findOne = (req, res) => {
    Service_provider_balance.findById(req.params.service_provider_balance_id)
    .then(service_provider_balance => {
        if(!service_provider_balance) {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_balance_id
            });            
        }
        res.send(service_provider_balance);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_balance_id
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving company with id " + req.params.service_provider_balance_id
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
    Service_provider_balance.findByIdAndRemove(req.params.service_provider_balance_id)
    .then(service_provider_balance => {
        if(!service_provider_balance) {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_balance_id
            });
        }
        res.send({message: "company deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "company not found with id " + req.params.service_provider_balance_id
            });                
        }
        return res.status(500).send({
            message: "Could not delete company with id " + req.params.service_provider_balance_id
        });
    });
};

exports.confirmbooking = (req, res) => {
    const service_provider_id = req.body.service_provider_id;
    const booking_id = req.body.booking_id;
    const total_amount = req.body.total_amount;
    const percent_income = (15/100)* parseInt(total_amount);
    console.log(service_provider_id);
    console.log(percent_income);
    Service_provider_balance.find({
        service_provider_id: service_provider_id,
        status: 1,
        
    }).sort({ _id: -1 }).limit(1).then(service_provider_balance => {
       
        console.log(service_provider_balance[0].balance_amount);

    /*    if(service_provider_balance[0].balance_amount === undefined || service_provider_balance[0].balance_amount.length == 0) {
            return res.status(201).json({
                message: "balance_money not found " 
            });            
        } */

      if( parseInt(percent_income) < parseInt(service_provider_balance[0].balance_amount) ){

        const new_balance = service_provider_balance[0].balance_amount;
        const new_credit_amount = service_provider_balance[0].credit_amount;


        Booking.findOneAndUpdate({ booking_id : booking_id }, {$set:{"booking_confirm": 1}},function(err, doc){
            if(err){
                console.log(err);
                res.status(201).json({
                    
                    message: "Already confirmed",                                           
                    data: err
                });
            }else {
                if(doc != null){
    
                    console.log(doc);

                    const adjustments = new_balance - percent_income;
                    
                    console.log(adjustments);

                    const service_provider_balance = new Service_provider_balance({
        
                        service_provider_id: service_provider_id || "No service_id", 
                        debit_amount: percent_income || "No star",
                        credit_amount: new_credit_amount || "No user_id",
                        balance_amount: adjustments || "No user_id"
                       
                    });
                    
                    // Save Item in the database
                    // find({ item_id: item_id, store_id: store_id, created_at: Date().now })
                    
                    service_provider_balance.save()
                
                    .then(service_provider_balance => {
                    //    res.send(data);
                        console.log(service_provider_balance);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Something wrong while creating the product."
                        });
                    });


                    res.status(200).json({
                       
                        message: "booking confirmed",
                        data: doc
                    });
                  }
                }
            });
         }
       else{

        res.status(202).json({
            
            message: "add balance in your account to confirm booking",
            data: service_provider_balance
        });
    }
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while confirming booking."
        });
    });
}

exports.addmoneytowallet = (req, res) => {
    const service_provider_id = req.body.service_provider_id;
    const new_credit_amount = req.body.credit_amount;
    console.log(service_provider_id);
    Service_provider_balance.find({
        service_provider_id: service_provider_id,
        status: 1
    }).sort({ _id: -1 }).limit(1).then(service_provider_balance => {
        console.log(service_provider_balance);
        console.log(service_provider_balance[0].credit_amount);
        const new_balance_amount = parseInt(new_credit_amount) + parseInt(service_provider_balance[0].balance_amount);
        const balance_pkid =service_provider_balance[0]._id;
        console.log(balance_pkid);
        Service_provider_balance.findByIdAndUpdate(balance_pkid, {
            credit_amount: new_credit_amount || "No category name", 
            balance_amount: new_balance_amount || "no category description"
           
        }, {new: true})
        .then(service_provider_balance => {
            if(!service_provider_balance) {
                return res.status(404).send({
                    message: "service_provider balance not found with id " + balance_pkid
                });
            }
            res.status(200).json({
               
                message: "OK",
                data: service_provider_balance
            });
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "service provider balance not found with id " + balance_pkid
                });                
            }
            return res.status(500).send({
                message: "service provider wrong updating with id " + balance_pkid
            });
        });

    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while adding money."
        });
    });
}