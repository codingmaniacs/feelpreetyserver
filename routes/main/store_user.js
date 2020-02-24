module.exports = (app) => {
    const store_users = require('../../controllers/main/store_user.controller.js');
    const store_usersdatatables = require('../../controllers/main/store_user_datatables.controller.js');
    
    // Create a new Store User
    app.post('/store_users', store_users.create);

   

    // Retrieve all Store users
    app.get('/store_users', store_users.getAllStoreUsers);

    // Retrieve a single Store Users with storeId
    app.post('/store_users/by_storeid', store_users.getStoreUsersByStoreID);

    app.post('/store_users/login', store_users.login);

    // Update a Store User with storeId
    app.put('/store_users', store_users.update);

    // Delete a Store User with storeId
    app.delete('/store_users/:store_pkid', store_users.delete);

    app.post('/getStoreusersdatatables',store_usersdatatables.getStoreusersdatatables);

    app.put('/store_user_enable/:storeuserenableId', store_users.enableById);
    app.put('/store_user_disable/:storeuserdisableId', store_users.disableById);
}