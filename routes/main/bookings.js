const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const booking = require('../../controllers/main/bookings.controller.js');
   // const order_detailsdatatables = require('../../controllers/main/order_details_datatables.controller.js');
  /*  app.use(function(req, res, next){
        // route middleware to verify a token
        // check header or url parameters or post parameters for token
        //var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var token = req.headers['token'].split(" ")[1];
        //console.log(token.split(" ")[1]);
        
        // decode token
        if (token) {
    
            // verifies secret and checks exp
            jwt.verify(token, 'secret', function(err, decoded) {       
                if (err) {
                    console.log(err);
                    return res.json({ success: false, message: 'Failed to authenticate token.' });       
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });
    
        } else {    
            // if there is no token
            // return an error
            return res.status(403).send({ 
                success: false, 
                message: 'No token provided.'
            });    
        }
    });  */
    // Create a new Product
    app.put('/booking_complete_service_provider/:bookingId', booking.completebookingserviceprovider);
    app.put('/booking_complete_app_user/:bookingId', booking.completebookingappuser);
    app.get('/bookingsconfirmedbyserviceprovider/:service_provider_id', booking.getConfirmedbookingsByserviceproviderID);
    app.get('/bookingsonprocessbyserviceprovider/:service_provider_id', booking.getonprocessbookigsByserviceproviderID);
    app.get('/bookingscompletedbyserviceprovider/:service_provider_id', booking.getcompletedbookigsByserviceproviderID);
    app.get('/bookingspendingforappuser/:app_user_id', booking.getpendingbookigsByappuserID);
    app.get('/bookingsconfirmedbyappuser/:app_user_id', booking.getconfirmedbookigsByappuserID);

}