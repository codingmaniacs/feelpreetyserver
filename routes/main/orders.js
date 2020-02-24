const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const order = require('../../controllers/main/orders.controller.js');
    const ordersdatatables = require('../../controllers/main/order_datatables.controller.js');
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
   
    // Retrieve all Products
    app.get('/order', order.findAll);


    app.post('/getOrdersdatatables',ordersdatatables.getOrdersdatatables);
    // Retrieve a single Product with productId
   // app.get('/orders/:orderId', orders.getOrdersByOrderID);

    // Retrieve a single Product with productId
    app.get('/order/:orderId', order.findOne);

    // Update a Note with productId
    app.put('/order/:orderId', order.update);

    // Delete a Note with productId
    app.delete('/order/:orderId', order.delete);
}