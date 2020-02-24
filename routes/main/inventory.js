const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const inventory_item = require('../../controllers/main/inventory_item.controller.js');
    const inventory_itemdatatables = require('../../controllers/main/inventory_item_datatables.controller.js');
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
    app.post('/inventory_item', inventory_item.create);
    
    //create new inventories 
    app.post('/create_inventories', inventory_item.createinventories);

    // Retrieve all Products
    app.get('/inventory_item', inventory_item.findAll);

    // Retrieve a single Product with productId
   // app.get('/orders/:orderId', orders.getOrdersByOrderID);

    // Retrieve a single Product with productId
    app.get('/inventory_item/:inventoryId', inventory_item.findOne);

    // Update a Note with productId
    app.put('/inventory_item/:inventoryId', inventory_item.update);

    // Delete a Note with productId
    app.delete('/inventory_item/:inventoryId', inventory_item.delete);
    app.post('/getInventoryItemsdatatables',inventory_itemdatatables.getInventoryItemsdatatables);
}