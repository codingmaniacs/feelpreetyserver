const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const order_details = require('../../controllers/main/order_details.controller.js');
    const order_detailsdatatables = require('../../controllers/main/order_details_datatables.controller.js');
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
    app.post('/order_details', order_details.create);

    // Retrieve all Products
    app.get('/order_details', order_details.findAll);

    // Retrieve a single Product with productId
   // app.get('/orders/:orderId', orders.getOrdersByOrderID);

    // Retrieve a single Product with productId
    app.get('/order_details/:orderId', order_details.findOne);

    // Update a Note with productId
    app.put('/order_details/:orderId', order_details.update);

    // Delete a Note with productId
    app.delete('/order_details/:orderId', order_details.delete);

    app.post('/getOrderdetailsdatatables',order_detailsdatatables.getOrderdetailsdatatables);
}