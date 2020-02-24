module.exports = (app) => {
    const service_reviews = require('../../controllers/main/service_review.controller.js');
//    const store_usersdatatables = require('../../controllers/main/store_user_datatables.controller.js');
    
    // Create a new Store User
    app.post('/service_reviews', service_reviews.create);

   

    // Retrieve all Store users
    app.get('/service_reviews', service_reviews.findAll);

    // Retrieve a single Store Users with storeId
    app.get('/service_reviews/:service_id', service_reviews.getServicereviewByServiceID);

    app.get('/service_reviews/:service_review_id', service_reviews.findOne);

    // Update a Store User with storeId
   

    // Delete a Store User with storeId
    app.delete('/service_reviews/:service_review_id', service_reviews.delete);

   
}