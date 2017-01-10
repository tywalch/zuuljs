var dataValidation = require('../../utilities/datavalidation');

var postNew = function(reqDetails) {
    return new Promise(function (resolve, reject) {
        //console.log(reqDetails.req);
        resolve(reqDetails);
    });
};

var postFunctionCall = function(reqDetails) {

    return new Promise(function (resolve, reject) {

    });
};

module.exports= {
    postNew: postNew,
    postFunctionCall: postFunctionCall
};