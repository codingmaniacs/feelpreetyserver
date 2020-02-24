const Service_provider_balance = require('../../models/main/service_provider_balance.model.js');
const Booking = require('../../models/main/bookings.model.js');
//const Inventory_item = require('../../models/main/inventory_item.model.js');

exports.completebookingserviceprovider = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "booking id content can not be empty"
        });
    }

    // Find and update Item with the request body
    Booking.findByIdAndUpdate(req.params.bookingId, {        
        booking_completed_service_provider: 1
    }, {new: true})
    .then(bookings => {
        if(!bookings) {
            return res.status(404).send({
                message: "booking not found with id " + req.params.bookingId
            });
        }
  
return res.status(200).json({
    
    message: "OK",                                           
    data: bookings
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "bookings not found with id " + req.params.bookingId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating booking with id " + req.params.bookingId
        });
    });
}; 

exports.completebookingappuser = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "booking id content can not be empty"
        });
    }

    // Find and update Item with the request body
    Booking.findByIdAndUpdate(req.params.bookingId, {        
        booking_completed_app_user: 1
    }, {new: true})
    .then(bookings => {
        if(!bookings) {
            return res.status(404).send({
                message: "booking not found with id " + req.params.bookingId
            });
        }
  
return res.status(200).json({
    
    message: "OK",                                           
    data: bookings
});
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "bookings not found with id " + req.params.bookingId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating booking with id " + req.params.bookingId
        });
    });
}; 

exports.getConfirmedbookingsByserviceproviderID = (req, res) => {
    const service_provider_id = req.params.service_provider_id;
    console.log(service_provider_id);
    Booking.find({
        service_provider_id: service_provider_id,
        booking_confirm: 1
    }).then(bookings => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: bookings
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving bookings."
        });
    });
}

exports.getonprocessbookigsByserviceproviderID = (req, res) => {
    const service_provider_id = req.params.service_provider_id;
    console.log(service_provider_id);
    Booking.find({
        service_provider_id: service_provider_id,
        booking_confirm: 0
    }).then(bookings => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: bookings
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving bookings."
        });
    });
}
exports.getcompletedbookigsByserviceproviderID = (req, res) => {
    const service_provider_id = req.params.service_provider_id;
    console.log(service_provider_id);
    Booking.find({
        service_provider_id: service_provider_id,
        booking_completed_service_provider: 1
    }).then(bookings => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: bookings
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving bookings."
        });
    });
}
exports.getpendingbookigsByappuserID = (req, res) => {
    const app_user_id = req.params.app_user_id;
    console.log(app_user_id);
    Booking.find({
        app_user_id: app_user_id,
        booking_confirm: 0
    }).then(bookings => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: bookings
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving bookings."
        });
    });
}

exports.getconfirmedbookigsByappuserID = (req, res) => {
    const app_user_id = req.params.app_user_id;
    console.log(app_user_id);
    Booking.find({
        app_user_id: app_user_id,
        booking_confirm: 1
    }).then(bookings => {
        res.status(200).json({
            status: true,
            status_code: 200,
            message: "OK",
            data: bookings
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving bookings."
        });
    });
}