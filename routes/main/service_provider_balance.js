module.exports = (app) => {
    const service_provider_balance = require('../../controllers/main/service_provider_balance.controller.js');
//    const store_usersdatatables = require('../../controllers/main/store_user_datatables.controller.js');
    
    // Create a new Store User
    app.post('/service_provider_balance', service_provider_balance.create);

   

    // Retrieve all Store users
    app.get('/service_provider_balance', service_provider_balance.findAll);

    // Retrieve a single Store Users with storeId
    app.post('/service_provider_balance/service_provider_id', service_provider_balance.getBalanceByServiceproviderID);

    app.post('/service_provider_balance/service_provider_balance_id', service_provider_balance.findOne);

    app.post('/service_provider_balance_confirm/', service_provider_balance.confirmbooking);

    app.post('/service_provider_add_money/', service_provider_balance.addmoneytowallet);

    // Update a Store User with storeId
   

    // Delete a Store User with storeId
    app.delete('/service_provider_balance/:service_provider_balance_id', service_provider_balance.delete);

   
}