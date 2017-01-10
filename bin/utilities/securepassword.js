var bcrypt = require('bcrypt-nodejs');

module.exports = {
    hashAndSalt: function(password) {
        return (bcrypt.hashSync(password));
    },
    verifyPassword: function(called, stored) {
        return (bcrypt.compareSync(called, stored));
    }
};