module.exports = (app) => {
    const service_provider_details = require('../../controllers/main/service_provider_details.controller.js');
//    const store_usersdatatables = require('../../controllers/main/store_user_datatables.controller.js');
    
    // Create a new Store User
    app.post('/service_provider_details', service_provider_details.create);

   

    // Retrieve all Store users
    app.get('/service_provider_details', service_provider_details.findAll);

    // Retrieve a single Store Users with storeId
    app.post('/service_provider_detailsbyserviceproviderID', service_provider_details.getServiceproviderdetailsByServiceproviderID);

    app.get('/service_provider_details/:service_provider_details_id', service_provider_details.findOne);

    // Update a Store User with storeId
   

    // Delete a Store User with storeId
    app.delete('/service_provider_details/:service_provider_details_id', service_provider_details.delete);

   
}
