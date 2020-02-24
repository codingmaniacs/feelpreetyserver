module.exports = (app) => {
    const app_user_address = require('../../controllers/main/app_user_address.controller.js');
//    const storesdatatables = require('../../controllers/main/stores_datatables.controller.js');

    // Create a new Stores
    app.post('/app_user_address', app_user_address.create);

    // Retrieve all Stores
    app.get('/app_user_address', app_user_address.findAll);


    app.put('/app_user_address/:app_user_id', app_user_address.enableById);
    app.put('/app_user_address/:app_user_id', app_user_address.disableById);
    app.get('/getappuseraddressbyappuserID/:app_user_id', app_user_address.getAddressbyappuserID);
}