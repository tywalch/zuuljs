var isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

var getClientDetails = function (req, res, next) {
    req.user.clientDetails = {};
    req.user.clientDetails.userAgent = req.headers['user-agent'];
    req.user.clientDetails.ipAddress = req.headers['x-real-ip'] || req.connection.remoteAddress;
    return next();
};

var firstRegister = function (req, res, next) {
    if (!req.user.particleToken && req.user.keyCount === 0 && req.user.deviceCount === 0) {
        res.render('../views/partials/register', {
            firstRegister: true,
            user: req.user
        });
    } else {
        return next();
    }
};

module.exports = {
    isLoggedIn: isLoggedIn,
    getClientDetails: getClientDetails,
    firstRegister: firstRegister
};