module.exports = (app) => {
    const stores = require('../../controllers/main/stores.controller.js');
    const storesdatatables = require('../../controllers/main/stores_datatables.controller.js');

    // Create a new Stores
    app.post('/stores', stores.create);

    // Retrieve all Stores
    app.get('/stores', stores.findAll);

    // Retrieve a single Stores with storeId
    app.post('/stores/get_store', stores.getStore);

    // Retrieve a single Stores with storeId
    app.post('/stores/validate_storeotp', stores.validate_storeotp);

    // Update a Stores with storeId
    app.put('/stores/:storeId', stores.update);

    // Delete a Stores with storeId
    app.delete('/stores/:storeId', stores.delete);

    app.post('/getStoresdatatables',storesdatatables.getStoresdatatables);

    app.put('/stores_enable/:storeenableId', stores.enableById);
    app.put('/stores_disable/:storedisableId', stores.disableById);
}