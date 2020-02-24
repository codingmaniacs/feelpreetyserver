const Order = require('../../models/main/orders.model.js');
var multer = require('multer');


exports.getOrdersdatatables = function (req, res) {

    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'store_id': regex},{'total_items': regex },{'total_amount': regex },{'createdAt': regex }] };
    }
    else
    {
         searchStr={};
    }

    var sort_data;
    const column = ['_id', 'name', 'description', 'price', 'status'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            '_id': orderDir
        }
        break;
        case '1': sort_data = {
            'store_id': orderDir
        }
        break;
        case '2': sort_data = {
            'total_items': orderDir
        }
        break;
        case '3': sort_data = {
            'total_amount': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }
    var recordsTotal = 0;
    var recordsFiltered=0;

    Order.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        Order.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Order.find(searchStr, '_id store_id total_items total_amount createdAt',{'skip': Number( req.body.start), 'limit': Number(req.body.length), 'sort': sort_data }, function (err, results) {
                    if (err) {
                        console.log('error while getting results'+err);
                        return;
                    }
            
                    var data = JSON.stringify({
                        "draw": req.body.draw,
                        "recordsFiltered": recordsFiltered,
                        "recordsTotal": recordsTotal,
                        "data": results
                    });
                    res.send(data);
                });
        
          });
   });

};

