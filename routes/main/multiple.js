const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const multiple = require('../../controllers/main/multiple.controller.js');

    app.post('/multiple', multiple.create);
   
    // Retrieve all Products
    app.get('/multiple', multiple.findAll);

    // Retrieve a single Product with productId
   // app.get('/orders/:orderId', orders.getOrdersByOrderID);

    // Retrieve a single Product with productId
    app.get('/multiple/:orderId', multiple.findOne);

    // Update a Note with productId
    app.put('/multiple/:orderId', multiple.update);

    // Delete a Note with productId
    app.delete('/multiple/:orderId', multiple.delete);
}