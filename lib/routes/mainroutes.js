var deviceRouter   = require('./deviceroutes');
var keyRouter      = require('./keyroutes');
var profileRouter  = require('./profileroutes');
var functionRouter = require('./functionroutes');
var profileRouter = require('./profileroutes');
var mainController = require('../controllers/maincontroller');
var profileController = require('../controllers/profilecontroller');
var functionController = require('../controllers/functioncontroller');
var clientDetails  = require('../../bin/helpers/routehelpers/clientdetails');
var express        = require('express');
var router         = express.Router();

var routes = function(app, passport) {
    app.use('/', router);
    app.use('/device', clientDetails.isLoggedIn, clientDetails.getClientDetails, deviceRouter);
    app.use('/key', clientDetails.isLoggedIn, clientDetails.getClientDetails, keyRouter);
    app.use('/profile', clientDetails.isLoggedIn, clientDetails.getClientDetails, profileRouter);
    app.use('/function', clientDetails.isLoggedIn, clientDetails.getClientDetails, functionRouter);
    app.use('/profile', clientDetails.isLoggedIn, clientDetails.getClientDetails, profileRouter);
    app.use(mainController.pageNotFound);

    router.route('/')
      .get(clientDetails.isLoggedIn, clientDetails.firstRegister, clientDetails.getClientDetails, mainController.getMain);

    router.route('/login')
      .get(mainController.getLogin)
      .post(passport.authenticate('local-login', {failureRedirect: '/login', failureFlash: true}), mainController.postLogin);

    router.route('/signup')
      .get(mainController.getSignUp)
      .post(passport.authenticate('local-signup', {failureRedirect: '/signup', failureFlash: true}), mainController.postSignUp);

    router.route('/logout')
      .get(mainController.getLogout);

    router.route('/register')
      .get(clientDetails.isLoggedIn, clientDetails.firstRegister, clientDetails.getClientDetails, mainController.getRegister)
      .post(clientDetails.isLoggedIn, clientDetails.getClientDetails, mainController.postRegister);

    router.route('/reset')
      .post(clientDetails.isLoggedIn, passport.authenticate('local-password-reset', {failureRedirect: '/profile', successRedirect: '/profile', failureFlash: true, successFlash: true}))

    router.route('/help')
      .get(mainController.getHelp)
};

var socketConnections = (function(io) {
    var connections = function (socket) {
        function disconnect() {
            console.log('client disconnected');
        }

        console.log('client connected');
        socket.on('disconnect', disconnect);

        socket.on('unsubscribe', function (room) {
            console.log('leaving room', room);
            socket.leave(room);
        });

        require('../controllers/functioncontroller').deviceFunctionHandlers(socket, io);
        require('../controllers/devicecontroller').deviceHandlers(socket, io);
        require('../controllers/keycontroller').keyHandlers(socket, io);
    };

    return io.on("connection", connections);
});


module.exports = {
    routes: routes,
    socketConnections: socketConnections
};

