var randtoken = require('rand-token');

var newRegistrationToken = (function() {
    var token = randtoken.generate(8);
    return token.toLowerCase();
});

var newKeyToken = (function() {
    var token = 'k' + randtoken.generate(8);
    return token.toLowerCase();
});

var newDeviceToken = (function() {
    var token = 'd' + randtoken.generate(8);
    return token.toLowerCase();
});

var newPrivateId = (function(){
    var token = randtoken.generate(15);
    return token;
});

var newPublicId = (function(){
    var token = randtoken.generate(15);
    return token.toLowerCase();
});

module.exports = {
    newRegistrationToken: newRegistrationToken,
    newKeyToken: newKeyToken,
    newDeviceToken: newDeviceToken,
    newPrivateId: newPrivateId,
    newPublicId: newPublicId
};