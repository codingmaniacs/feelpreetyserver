const Store_users = require('../../models/main/store_users.model.js');
var multer = require('multer');


exports.getStoreusersdatatables = function (req, res) {

    //console.log(req.body.search.value);
    var searchStr = req.body.search.value;
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'_id': regex},{'name': regex },{'user_name': regex },{'address': regex },{'city': regex },{'state': regex },{'pincode': regex },{'emailid': regex },{'phoneno': regex },{'avatar': regex },{'store_id': regex },{'status': regex },{'createdAt': regex },{'updatedAt': regex }] };
    }else{
        searchStr={};
    }
    var sort_data;
    const column = ['_id', 'name', 'user_name', 'address', 'city', 'state', 'pincode', 'emailid', 'phoneno', 'avatar', 'store_id', 'status', 'createdAt', 'updatedAt'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            '_id': orderDir
        }
        break;
        case '1': sort_data = {
            'name': orderDir
        }
        break;
        case '2': sort_data = {
            'user_name': orderDir
        }
        break;
        case '3': sort_data = {
            'address': orderDir
        }
        break;
        case '4': sort_data = {
            'city': orderDir
        }
        break;
        case '4': sort_data = {
            'state': orderDir
        }
        break;
        case '5': sort_data = {
            'pincode': orderDir
        }
        break;
        case '6': sort_data = {
            'emailid': orderDir
        }
        break;
        case '7': sort_data = {
            'phoneno': orderDir
        }
        break;
        case '8': sort_data = {
            'avatar': orderDir
        }
        break;
        case '9': sort_data = {
            'store_id': orderDir
        }
        break;
        case '10': sort_data = {
            'status': orderDir
        }
        break;
        case '11': sort_data = {
            'createdAt': orderDir
        }
        case '12': sort_data = {
            'updatedAt': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;

  
    
    Store_users.countDocuments({}, function(err, c) {
        recordsTotal=c;
        console.log('Search String : ' + searchStr);
        console.log(c);
        Store_users.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Store_users.find(searchStr,'_id name user_name address city state pincode emailid phoneno avatar store_id status createdAt updatedAt',{'skip': Number( req.body.start), 'limit': Number(req.body.length) , 'sort': sort_data },function (err, results) {
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

