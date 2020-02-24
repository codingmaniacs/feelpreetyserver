const jwt = require('jsonwebtoken');
module.exports = (app) => {
    const company = require('../../controllers/main/company.controller.js');
    const companydatatables = require('../../controllers/main/company_datatables.controller.js');
    /*app.use(function(req, res, next){
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
    }); 
    */
    // Create a new Product
    app.post('/company', company.create);

    // Retrieve all Products
    app.get('/company', company.findAll);

    //app.get('/categories_with_products2', products.getProductsWithCategories2);
    
    // Retrieve a single Product with productId
    app.get('/company/:company_id', company.getCompaniesByCompanyID);

    // Retrieve a single Product with productId
    app.get('/company/:productId', company.findOne);

    // Update a Note with productId
    app.put('/company/:companyId', company.update);

    // Delete a Note with productId
    app.delete('/company/:companyId', company.delete);
   // app.post('/products_with_inventories', products.getProductsWithInventories);

   app.post('/getCompanydatatables',companydatatables.getCompanydatatables);

}