const Reception = require('../../models/main/reception.model.js');



//Create new Store
exports.lunch = (req, res) => {
    // Request validation
    // Create a Store
    function randomstring() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var string_length = 6;
        var randomstring = '';
        for (var i = 0; i < string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum, rnum + 1);
        }
        return randomstring;
    }
//  // console.log(randomstring);

    for (var i = 0; i < 50; i++) {

        randomstring1 = randomstring();

        const reception = new Reception({
            reception_code: randomstring1 || "No owner name",
            code_type: "L" || "No store address",
            breakfast: "2" || "No store address"
        });

        //   // Save Store in the database
        reception.save().then(data => {
            res.status(200).send(data)               
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the reception for lunch."
            });
        });
    }
};


exports.dinner = (req, res) => {
 // Request validation


 // Create a Store
//  function randomstring1() {
//   var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//   var string_length = 5;
//   var randomstring1 = '';
//   for (var i = 0; i < string_length; i++) {
//    var rnum = Math.floor(Math.random() * chars.length);
//    randomstring1 += chars.substring(rnum, rnum + 1);
//   }
//   return randomstring1;
//  }
//  // console.log(randomstring);

//  for (var i = 0; i < 300; i++) {

//   randomstring2 = randomstring1();

//   const reception = new Reception({
//    reception_code: randomstring2 || "No owner name",
//    lunch: 0,
//    dinner: 1




//   });

//   // Save Store in the database
//   reception.save().then(data => {
   Reception.find({
    dinner: 1,
    status: 1
   }).then(reception => {
    res.status(200).send(reception);
   }).catch(err => {
    res.status(500).send({
     message: err.message || "Something wrong while retrieving reception for dinner."
    });
   });
//   }).catch(err => {
//    res.status(500).send({
//     message: err.message || "Something wrong while creating the dinner."
//    });
//   });
//  }

};
exports.getCodeDetails = (req, res) => {
    const reception_code = req.body.reception_code;
    console.log(reception_code);
    Reception.findOne({
        reception_code: reception_code,
        status: 1
    }).then(reception => {
        res.status(200).json({
             lunch: reception.lunch,
             dinner: reception.dinner
            // breakfast: reception.breakfast
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Your reception code might have expired."
        });
    });

};


exports.update = (req, res) => {
    const reception_code = req.body.reception_code;
    user_input = req.body.user_input;
    console.log(reception_code);
    Reception.findOneAndUpdate({ $and: [ {reception_code:reception_code}, {code_type:user_input} ] }, {$set: {status: 0}}, {new: true}, function(err,doc) {
        if (err) { throw err; }
        else res.status(200).json({
            data: doc
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving code."
        });
    });
}

exports.updatemany = (req, res) => {
    const breakfast = req.body.breakfast;
    console.log(breakfast);
    Reception.findOneAndUpdate({ $and: [ {breakfast:breakfast}, {code_type:"0"} ] }, {$set: {code_type: "B"}}, {new: true}, function(err,doc) {
        if (err) { throw err; }
        else res.status(200).json({
            data: doc
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving code."
        });
    });
}

exports.getCodeDetailslunchbreakfastdinner = (req, res) => {
    const reception_code = req.body.reception_code;
    const user_input = req.body.user_input;
    
   
    if( user_input=="L" ) {

    console.log(reception_code);
    Reception.findOne({
        reception_code: reception_code,
        code_type: "L",
        status: 1
    }).then(reception => {
        res.status(200).json({
            code_type: reception.code_type
           
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Your reception code might have expired."
        });
    });

    }

    else if( user_input=="B" ){

        Reception.findOne({
            reception_code: reception_code,
            code_type: "B",
            status: 1
        }).then(reception => {
            res.status(200).json({
                code_type: reception.code_type
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Your reception code might have expired."
            });
        });

    }

    else {

        Reception.findOne({
            reception_code: reception_code,
            code_type: "D",
            status: 1
        }).then(reception => {
            res.status(200).json({
                code_type: reception.code_type
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Your reception code might have expired."
            });
        });

    }

};





exports.getCodeDetailscount = (req, res) => {
    
  /*  const user_input = req.body.user_input;
    
   
    if( user_input=="D" ) {

   
        Reception.find({
                    dinner: 1,
                    status: 0
                    }).countDocuments(function (e, count) {
                        res.status(200).json({
                           count: count
                        });
    
                });

    }

    else if(user_input=="L"){

        Reception.find({
            lunch: 1,
            status: 0
            }).countDocuments(function (e, count) {
                res.status(200).json({
                    count: count
                 });

        });

    }

    else {

        Reception.find({
            breakfast: 1,
            status: 0
            }).countDocuments(function (e, count) {
                
                res.status(200).json({
                    count: count
                 });

        });
    } */

    Reception.find({
        status: 0
        }).then(reception => {

            breakfast_count = 0;
            lunch_count = 0;
            dinner_count =0;
            for(let i = 0; i < reception.length; i++){

                console.log(reception[i].code_type);

                if(reception[i].code_type == "L"){
                    lunch_count = lunch_count+1;
                }

                else if(reception[i].code_type == "D"){
                    dinner_count = dinner_count+1;
                }

                else {
                    breakfast_count = breakfast_count +1 ;
                }

            }
            console.log(lunch_count);

            res.status(200).json({
               lunch:lunch_count,
               dinner:dinner_count,
               breakfast:breakfast_count

            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Your reception code might have expired."
            });
        });

    };

    exports.findAllNext = (req, res) => {
        Reception.find({
            code_type: "B",
            breakfast: "2"
        })
        .then(reception => {
            res.status(200).send(reception);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving reception."
            });
        });
    };

    exports.findAll = (req, res) => {
        Reception.find()
        .then(reception => {
            res.send(reception);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving reception."
            });
        });
    };

