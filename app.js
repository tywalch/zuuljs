var express      = require('express');
var handlebars   = require('express-handlebars');
var session		 = require('express-session');
var MongoStore   = require('connect-mongo')(session);
var path         = require('path');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var passport     = require('passport');
var morgan 		 = require('morgan');
var flash    	 = require('connect-flash');
var serverConfig = require('./config/serverconfig');
var dbConfig     = require('./config/database');
var helmet       = require('helmet');
var app          = express();

var sessionDetails = session({
    store: new MongoStore({
        url: dbConfig.mongodb.url
    }),
    secret: serverConfig.secret,
    resave: true,
    saveUninitialized: true,
    maxAge: null
});

// Public Directory
app.use(express.static('public'));

// Passport
require('./config/passport')(passport); // pass passport for configuration
app.use(sessionDetails); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Misc
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(flash());

// Handlebars Templating
var hbs = handlebars.create({
    defaultLayout: 'main',
    layoutsDir: 'lib/views/layouts',
    partialsDir: 'lib/views/partials'
});
app.engine('handlebars', hbs.engine);
app.set('views', path.join(__dirname, 'lib/views'));
app.set('view engine', 'handlebars');


app.use(helmet());

// Routes
//var routes = require('./lib/routes/mainroutes')(app, passport);
require('./lib/routes/mainroutes').routes(app, passport);

var port = serverConfig.port;
var ip = serverConfig.ip;
/*
app.listen(port, function() {
    console.log('Running Server on Port: ' + port);
});
*/

var socketSession = (function(socket, next){
    sessionDetails(socket.request, {}, next);
});

var socketPassport = (function(socket, next) {
    if (socket.request.session.passport) {
        passport.deserializeUser(socket.request.session.passport.user, function(err, data) {
            if (err) {
                console.log('deserialization error in app.js:', err);
            } else {
                socket.request.session.passport.user = data;
                socket.request.session.passport.user.clientDetails = socket.handshake.headers;
                socket.request.session.passport.user.clientDetails.userAgent = socket.handshake.headers['user-agent'];
                socket.request.session.passport.user.clientDetails.ipAddress = socket.handshake.address;
                next();
            }
        });
    }
});



var server = (app.listen(port, ip, function() {
    console.log('Running Server on Port: ' + port);
}));

var io = require("socket.io")(server)
    .use(socketSession)
    .use(socketPassport);

require('./lib/routes/mainroutes').socketConnections(io);

module.exports = {
    app: app,
    zuuldb: dbConfig.zuuldb
}

/**
 * "socket.io": "^0.9.16"
 * socket stuff below
 *
 var io = require('socket.io').listen(server);
 io.on('connection',serverConfig.handleIO);

 io.configure(function() {
    io.enable("browser client minification");
    io.enable("browser client etag");
    io.set("log level", 1);
    io.set('transports', [
        'websocket',
        'xhr-polling',
        'jsonp-polling'
    ]);
 });
 *
 */