const Store = require('../../models/main/store.model.js');
var multer = require('multer');


exports.getStoresdatatables = function (req, res) {

    //console.log(req.body.search.value);
    var searchStr = req.body.search.value;
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'store_name': regex },{'store_address': regex },{'store_state': regex },{'store_pincode': regex },{'store_emailid': regex },{'store_phoneno': regex },{'owner_name': regex },{'owner_address': regex },{'owner_city': regex },{'owner_pincode': regex },{'owner_phoneno': regex },{'store_code': regex },{'store_city': regex },,{'status': regex }] };
    }else{
        searchStr={};
    }
    var sort_data;
    const column = ['_id', 'store_name', 'store_address', 'store_state', 'store_pincode', 'store_emailid', 'store_phoneno', 'owner_name', 'owner_address', 'owner_city', 'owner_pincode', 'owner_phoneno', 'store_code', 'store_city' , 'status'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            '_id': orderDir
        }
        break;
        case '1': sort_data = {
            'store_name': orderDir
        }
        break;
        case '2': sort_data = {
            'store_address': orderDir
        }
        break;
        case '3': sort_data = {
            'store_state': orderDir
        }
        break;
        case '4': sort_data = {
            'store_pincode': orderDir
        }
        break;
        case '4': sort_data = {
            'store_emailid': orderDir
        }
        break;
        case '5': sort_data = {
            'store_phoneno': orderDir
        }
        break;
        case '6': sort_data = {
            'owner_name': orderDir
        }
        break;
        case '7': sort_data = {
            'owner_address': orderDir
        }
        break;
        case '8': sort_data = {
            'owner_city': orderDir
        }
        break;
        case '9': sort_data = {
            'owner_pincode': orderDir
        }
        break;
        case '10': sort_data = {
            'owner_phoneno': orderDir
        }
        break;
        case '11': sort_data = {
            'store_code': orderDir
        }
        case '12': sort_data = {
            'store_city': orderDir
        }
        break;
        case '13': sort_data = {
            'status': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;

  
    
    Store.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log('Search String : ' + searchStr);
        console.log(c);
        Store.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Store.find(searchStr,'_id store_name store_address store_state store_pincode store_emailid store_phoneno owner_name owner_address owner_city owner_pincode owner_phoneno store_code store_city createdAt updatedAt status',{'skip': Number( req.body.start), 'limit': Number(req.body.length) , 'sort': sort_data },function (err, results) {
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

