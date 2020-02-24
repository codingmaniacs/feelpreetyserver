module.exports = (app) => {
    const service_provider = require('../../controllers/main/service_provider.controller.js');
    const service_provider_datatables = require('../../controllers/main/service_provider_datatables.controller.js');

   // const storesdatatables = require('../../controllers/main/stores_datatables.controller.js');

    // Create a new Stores
    app.post('/service_provider', service_provider.createotp);

    app.post('/serviceverify', service_provider.verifyme);
    app.post('/service_provider/validate_serviceprovider/:serviceproviderId', service_provider.validateserviceprovider);

    app.post('/service_provider/register', service_provider.create);

    // Retrieve all Stores
    app.get('/service_provider', service_provider.findAll);


    app.post('/service_provider/login', service_provider.loginme);
    app.post('/app_user/serviceloginemailorphoneno', service_provider.loginwithemailornumber);

    app.post('/serviceprovider_byfilter/', service_provider.getService_providerByFilter);

    app.post('/service_provider/forgetpassword', service_provider.updatepass);
    app.post('/service_provider/changepassword', service_provider.changepass);

    app.post('/get_Service_provider_datatables',service_provider_datatables.get_Service_provider_datatables);

  //  app.post('/verify', app_user.verifyme);

    // Retrieve a single Stores with storeId
   // app.post('/stores/get_store', app_user.getStore);

    // Retrieve a single Stores with storeId
  //  app.post('/stores/validate_storeotp', app_user.validate_storeotp);

    // Update a Stores with storeId
  //  app.put('/stores/:storeId', app_user.update);

    // Delete a Stores with storeId
  //  app.delete('/stores/:storeId', app_user.delete);

   // app.post('/getStoresdatatables',storesdatatables.getStoresdatatables);

  //  app.put('/stores_enable/:storeenableId', app_user.enableById);
  //  app.put('/stores_disable/:storedisableId', app_user.disableById);
}
