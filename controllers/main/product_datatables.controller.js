const Product = require('../../models/main/product.model.js');
var multer = require('multer');


exports.getProductsdatatables = function (req, res) {

    //console.log(req.body.search.value);
    var searchStr = req.body.search.value;
    if(req.body.search.value){
        var regex = new RegExp(req.body.search.value, "i")
        searchStr = { $or: [{'name': regex},{'description': regex }] };
        console.log(searchStr);
    }else{
        searchStr={};
    }
    var sort_data;
    const column = ['_id', 'name', 'description', 'price', 'status' , 'file_path'];
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
            'description': orderDir
        }
        break;
        case '3': sort_data = {
            'price': orderDir
        }
        break;
        case '4': sort_data = {
            'file_path': orderDir
        }
        break;
        default: sort_data = {
            'createdAt': -1
        }
    }

    var recordsTotal = 0;
    var recordsFiltered=0;

  
    
    Product.countDocuments({}, function(err, c) {
        recordsTotal=c;
       // console.log('Search String : ' + searchStr);
       // console.log(c);
        Product.countDocuments(searchStr, function(err, c) {
            recordsFiltered=c;
            //console.log(c);
            console.log(req.body.start);
            console.log(req.body.length);
            Product.find(searchStr,'_id name description price status file_path',{'skip': Number( req.body.start), 'limit': Number(req.body.length) , 'sort': sort_data },function (err, results) {
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

