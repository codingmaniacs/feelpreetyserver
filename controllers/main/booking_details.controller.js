const Booking_detail = require('../../models/main/booking_details.model.js');
const Booking = require('../../models/main/bookings.model.js');
//const Inventory_item = require('../../models/main/inventory_item.model.js');
//const Inventory_item = require('../../models/main/inventory_item.model.js');
const bookingid = require('order-id')('secret');

//Create new Item
exports.create = (req, res) => {
    if(!req.body) {        
        return res.status(400).send({
            message: "Order content can not be empty"
        });
    }
    // documents array
   
    const checkout_services = req.body;
    var total_services_qty = 0;
    var total_amount = 0;
    if(req.body !== ""){
        checkout_services.forEach(function(value) {

            total_services_qty = total_services_qty + parseInt(value.qty);
            total_amount = total_amount + parseInt(value.sub_total);
            service_provider_id = value.service_provider_id;
            app_user_id = value.app_user_id;
            //console.log(total_item_qty);
           
        });
       // console.log(total_item_qty);
        //console.log(total_amount);
        // Create a Order
        const id = bookingid.generate()
        var booking_id = bookingid.getTime(id);
        const booking = new Booking({
            // order_pkid: 
         
            booking_id : booking_id,
            service_provider_id : service_provider_id,
            app_user_id: app_user_id,
            total_services : total_services_qty || "No total items", 
            total_amount: total_amount || "No total amount"
             
         });
         
         // Save Item in the database
         booking.save()
        
        .then(booking_data => {
            console.log(checkout_services);
           console.log("i am here1");
             //res.send(data);
            var insert_checkout_services = [];
            var insert_checkout_services_array = {};
            /*
            data = JSON.parse(checkout_items); // you missed that...
            for(var i = 0; i < data.length; i++) {
                insert_checkout_items_array["order_id"] = order_data.order_id;
                insert_checkout_items_array["item_total_amount"] = data[i].item_total_amount;
                insert_checkout_items.push(insert_checkout_items_array);
            }
            */
           
           checkout_services.forEach(function(value2) {

                console.log("i am here2");
                insert_checkout_services_array["booking_id"] = booking_data.booking_id;
                //insert_checkout_items_array["order_pkid"] = order_data.id;
                insert_checkout_services_array["service_id"] = value2.service_id;
                insert_checkout_services_array["name"] = value2.name;
                insert_checkout_services_array["qty"] = value2.qty;
                insert_checkout_services_array["price"] = value2.price;
                insert_checkout_services_array["sub_total"] = value2.sub_total;
                
                insert_checkout_services.push(insert_checkout_services_array);
                insert_checkout_services_array = {};
                console.log(insert_checkout_services);
              //  inventory_management(value2.qty, value2.product_id, value2.name, 1);
                //console.log(insert_checkout_items);           
            });
            
           
            // save multiple documents to the collection referenced by Book Model
            Booking_detail.collection.insertMany(insert_checkout_services, { forceServerObjectId: true }, function (err, docs) {
                if (err){ 
                    return console.error(err);
    
                } else {
                    return res.status(200).json({
                        
                        message: "OK",
                        data: booking_data
                    });
    
                }
            });
    
         }).catch(err => {
             res.status(500).send({
                 message: err.message || "Something wrong while placing the order."
             });
         });
    }else{
        res.status(500).send({
            message: "Please enter something."
        });
    }
    
}; 
// function inventory_management(item_qty, product_id, product_name, store_id){
//     // documents array
//     var opening_stock;
//     var stock_purchased = item_qty ;
//     var product_id = product_id ;
//     var product_name = product_name ;
//     var store_id = store_id ;

//     currentYear = new Date().getFullYear();
//     currentMonth = new Date().getMonth();
//     currentDay = new Date().getDate();
//     nextDay = new Date().getDate()+1;
//     //console.log(currentYear + '' + currentMonth + '' + currentDay);

//     Inventory_item.findOne({"createdAt": { $gte: new Date(currentYear, currentMonth, currentDay), $lt: new Date(currentYear, currentMonth, nextDay)}, 'store_id': store_id,'product_id': product_id, 'status': 1  }).then(inventory_items => {
//         console.log(inventory_items);
//         if (inventory_items == null) {
//             console.log('I am here');
//             Inventory_item.findOne({ store_id: store_id,product_id: product_id, status: 1  }, { '_id': 0 },  { limit: 1, sort: {$natural:-1} }).exec(function(err, docs) {
//                 console.log('I am here2');
//                 if(err) console.log(err);
//                 const previous_closing_stock = docs.closing_stock;
//                 //total_stock_purchased = parseInt(docs.stock_purchased) + parseInt(stock_purchased);
//                 opening_stock = previous_closing_stock;

//                 const inventory_item = new Inventory_item({
//                     store_id: store_id,
//                     product_id: product_id || "No item title", 
//                     product_name : product_name || "No order qty",
//                 // attributes : attributes || "No attributes",
//                     opening_stock: opening_stock || "No price",
//                     stock_purchased: stock_purchased || "No Stalk Purchased",
//                     closing_stock: parseInt(opening_stock) - parseInt(stock_purchased)
//                 });
                
//                 // Save Item in the database
//                 // find({ item_id: item_id, store_id: store_id, created_at: Date().now })
                
//                 inventory_item.save()
            
//                 .then(data => {
//                     res.send(data);
//                     console.log(inventory_item)
//                 }).catch(err => {
//                     res.status(500).send({
//                         message: err.message || "Something wrong while creating the product."
//                     });
//                 });

//             });
//         }else{
//             console.log('I am here Update');
//             closing_stock = inventory_items.closing_stock;
//             total_stock_purchased = parseInt(inventory_items.stock_purchased) + parseInt(stock_purchased);
//             console.log(inventory_items);
//             //inventory_item.save()
//             Inventory_item.findByIdAndUpdate(inventory_items.id, {
//                 store_id: store_id,
//                 product_id: product_id || "No item title", 
//                 product_name : product_name || "No order qty",
//                 // attributes : attributes || "No attributes",
//                 stock_purchased: total_stock_purchased || "No Stalk Purchased",
//                 closing_stock: parseInt(closing_stock) - parseInt(stock_purchased)
//             }, {new: true})
//             .then(data => {
//                 res.send(data);
//                 console.log(data)
//             }).catch(err => {
//                 res.status(500).send({
//                     message: err.message || "Something wrong while creating the product."
//                 });
//             });
//         }
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving products."
//         });
//     });


// };
// // Retrieve all Item from the database.
// exports.findAll = (req, res) => {
//     Order_detail.find()
//     .then(order_details => {
//         res.send(order_details);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Something wrong while retrieving Order_details."
//         });
//     });
// };

// // Find a single Item with a productId
// exports.findOne = (req, res) => {
//     Order_detail.findById(req.params.orderId)
//     .then(order_detail => {
//         if(!order_detail) {
//             return res.status(404).send({
//                 message: "Order_details not found with id " + req.params.orderId
//             });            
//         }
//         res.send(order_detail);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Order_details not found with id " + req.params.orderId
//             });                
//         }
//         return res.status(500).send({
//             message: "Something wrong retrieving Order_details with id " + req.params.productId
//         });
//     });
// };

// // Update a Item
// exports.update = (req, res) => {
//     // Validate Request
//     if(!req.body) {
//         return res.status(400).send({
//             message: "Product content can not be empty"
//         });
//     }

//     // Find and update Item with the request body
//     Order_detail.findByIdAndUpdate(req.params.orderId, {
//         product_id: req.body.product_id || "No product id", 
//         name: req.body.name || "No name", 
//         qty: req.body.qty || "No qty", 
//         price: req.body.price || "No price", 
//         sub_total: req.body.sub_total || "No sub total", 
//     }, {new: true})
//     .then(order_details => {
//         if(!order_details) {
//             return res.status(404).send({
//                 message: "Order_details not found with id " + req.params.orderId
//             });
//         }
//         res.send(order_details);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Order_details not found with id " + req.params.orderId
//             });                
//         }
//         return res.status(500).send({
//             message: "Something wrong updating Order_details with id " + req.params.orderId
//         });
//     });
// };

// // Delete a Item with the specified productId in the request
// exports.delete = (req, res) => {
//     Order_detail.findByIdAndRemove(req.params.orderId)
//     .then(order_detail => {
//         if(!order_detail) {
//             return res.status(404).send({
//                 message: "Order_details not found with id " + req.params.orderId
//             });
//         }
//         res.send({message: "Order_details deleted successfully!"});
//     }).catch(err => {
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Order_details not found with id " + req.params.Id
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete Order_details with id " + req.params.orderId
//         });
//     });
// };
