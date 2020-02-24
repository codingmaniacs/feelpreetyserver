module.exports = (app) => {
    const app_user = require('../../controllers/main/app_user.controller.js');
    const app_user_datatables = require('../../controllers/main/app_user_datatables.controller.js');
   // const storesdatatables = require('../../controllers/main/stores_datatables.controller.js');

    // Create a new Stores
    app.post('/app_user', app_user.createotp);

    app.post('/app_user/register', app_user.create);

    // Retrieve all Stores
    app.get('/app_user', app_user.findAll);


    app.post('/app_user/login', app_user.loginme);

    app.post('/app_user/loginemailorphoneno', app_user.loginwithemailornumber);

    app.post('/verify', app_user.verifyme);
    app.post('/forgetpassword', app_user.updatepass);
    app.post('/changepassword', app_user.changepass);
    app.post('/get_App_user_datatables',app_user_datatables.get_App_user_datatables);

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
