const Order_detail = require('../../models/main/order_details.model.js');
var multer = require('multer');


exports.getOrderdetailsdatatables = function (req, res) {

    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'order_id': regex},{'product_id': regex },{'name': regex },{'qty': regex },{'price': regex }] };
    }
    else
    {
         searchStr={};
    }

    var sort_data;
    const column = ['_id','order_id','product_id', 'name', 'qty', 'price'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            '_id': orderDir
        }
        break;
        case '1': sort_data = {
            'order_id': orderDir
        }
        break;
        case '2': sort_data = {
            'product_id': orderDir
        }
        break;
        case '3': sort_data = {
            'name': orderDir
        }
        break;
        case '4': sort_data = {
            'qty': orderDir
        }
        break;
        case '5': sort_data = {
            'price': orderDir
        }
       /* break;
        case '5': sort_data = {
            'sub_total': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        } */
    }
    var recordsTotal = 0;
    var recordsFiltered=0;

    Order_detail.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        Order_detail.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Order_detail.find(searchStr, '_id order_id product_id name qty price sub_total',{'skip': Number( req.body.start), 'limit': Number(req.body.length), 'sort': sort_data }, function (err, results) {
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

