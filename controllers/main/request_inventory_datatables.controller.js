const Request_inventory = require('../../models/main/request_inventory.model.js');
var multer = require('multer');


exports.getReqInventorydatatables = function (req, res) {

    //console.log(req.body.search.value);
    var searchStr = req.body.search.value;
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'store_id': regex},{'product_id': regex },{'stock_request': regex },{'status': regex }] };
    }else{
        searchStr={};
    }
    var sort_data;
    const column = ['store_id', 'product_id', 'stock_request', 'status'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            'store_id': orderDir
        }
        break;
        case '1': sort_data = {
            'product_id': orderDir
        }
        break;
        case '2': sort_data = {
            'stock_request': orderDir
        }
        break;
        case '3': sort_data = {
            'status': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;

  
    
    Request_inventory.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log('Search String : ' + searchStr);
        console.log(c);
        Request_inventory.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Request_inventory.find(searchStr,'store_id product_id stock_request status createdAt updatedAt',{'skip': Number( req.body.start), 'limit': Number(req.body.length) , 'sort': sort_data },function (err, results) {
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

