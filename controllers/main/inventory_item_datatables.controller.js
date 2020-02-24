const Inventory_item = require('../../models/main/inventory_item.model.js');
var multer = require('multer');


exports.getInventoryItemsdatatables = function (req, res) {

    
    var searchStr = req.body.search.value;
    if(req.body.search.value)
    {
            var regex = new RegExp(req.body.search.value, "i")
            searchStr = { $or: [{'_id': regex},{'store_id': regex},{'product_id': regex },{'inventory_item_id': regex },{'product_name': regex },{'opening_stock': regex },{'stock_purchased': regex },{'closing_stock': regex }] };
    }
    else
    {
         searchStr={};
    }

    var sort_data;
    const column = ['_id','store_id','product_id', 'inventory_item_id', 'product_name', 'opening_stock','stock_purchased','closing_stock'];
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
            'product_id': orderDir
        }
        break;
        case '3': sort_data = {
            'inventory_item_id': orderDir
        }
        break;
        case '4': sort_data = {
            'opening_stock': orderDir
        }
        break;
        case '5': sort_data = {
            'stock_purchased': orderDir
        }
        break;
        case '6': sort_data = {
            'closing_stock': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        } 
    }
    var recordsTotal = 0;
    var recordsFiltered=0;

    Inventory_item.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log(c);
        Inventory_item.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Inventory_item.find(searchStr, '_id store_id product_id inventory_item_id product_name opening_stock stock_purchased closing_stock createdAt',{'skip': Number( req.body.start), 'limit': Number(req.body.length), 'sort': sort_data }, function (err, results) {
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

