const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const request_inventory = require('../../controllers/main/request_inventory.controller.js');
    const requestdatatables = require('../../controllers/main/request_inventory_datatables.controller.js');

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
    // Update new inventory date wise with respect to product id and stalk available
    app.post('/request_inventory', request_inventory.createreq);
    
    //create new inventories 
    app.post('/request_inventory', request_inventory.createinventories);

    // Retrieve all Products
    app.get('/request_inventory', request_inventory.findAll);

    // Retrieve a single Product with productId
   // app.get('/orders/:orderId', orders.getOrdersByOrderID);

    // Retrieve a single Product with productId
    app.get('/request_inventory/:reqinventoryId', request_inventory.findOne);

    // Update a Note with productId
    app.put('/request_inventory/:reqinventoryId', request_inventory.update);
    app.put('/request_inventory', request_inventory.approvereqByreqId);


    // Delete a Note with productId
    app.delete('/request_inventory/:reqinventoryId', request_inventory.delete);

    app.post('/getReqInventorydatatables',requestdatatables.getReqInventorydatatables);
}