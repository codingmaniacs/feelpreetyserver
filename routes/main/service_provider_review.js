module.exports = (app) => {
    const service_provider_reviews = require('../../controllers/main/service_provider_review.controller.js');
//    const store_usersdatatables = require('../../controllers/main/store_user_datatables.controller.js');
    
    // Create a new Store User
    app.post('/service_provider_reviews', service_provider_reviews.create);

   

    // Retrieve all Store users
    app.get('/service_provider_reviews', service_provider_reviews.findAll);

    // Retrieve a single Store Users with storeId
    app.post('/service_provider_reviewsbyserviceproviderID', service_provider_reviews.getServiceproviderreviewByServiceproviderID);

    app.get('/service_provider_reviews/:service_provider_review_id', service_provider_reviews.findOne);

    // Update a Store User with storeId
   

    // Delete a Store User with storeId
    app.delete('/service_provider_reviews/:service_provider_review_id', service_provider_reviews.delete);

   
}
