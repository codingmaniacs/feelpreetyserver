const App_user = require('../../models/main/app_user.model.js');
var multer = require('multer');


exports.get_App_user_datatables = function (req, res) {
    //console.log(req.body.search.value);
    var searchStr = req.body.search.value;
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'user_name': regex},{'user_emailid': regex },{'user_phoneno': regex },{'user_image': regex }] };
    }else{
        searchStr={};
    }
    var sort_data;
    const column = ['_id','user_name','user_emailid','user_phoneno','user_image'];
    var orderDir = req.body.order[0].dir;
 
    switch(req.body.order[0].column){
        case '0': sort_data = {
            '_id': orderDir
        }
        break;
        case '1': sort_data = {
            'user_name': orderDir
        }
        break;
        case '2': sort_data = {
            'user_emailid': orderDir
        }
        break;
        case '3': sort_data = {
            'user_phoneno': orderDir
        }
        break;
        case '4': sort_data = {
            'user_image': orderDir
        }
       
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;

    App_user.countDocuments({}, function(err, c) {
        recordsTotal=c;
        //console.log('Search String : ' + searchStr);
        App_user.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            
            console.log(req.body.start);
            console.log(req.body.length);
            App_user.find(searchStr, '_id user_name user_emailid user_phoneno user_image', {'skip': Number( req.body.start), 'limit': Number(req.body.length) , 'sort': sort_data }, function (err, results) {
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

