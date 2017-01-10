var Sequelize = require('sequelize');

var sqlConnection = {
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME,
    'dateStrings': 'date',
    _socket: process.env.OPENSHIFT_Cart_Name_DB_SOCKET,
    dialect: 'mysql'
};

var mongodb = {
    host     : process.env.OPENSHIFT_MYSQL_DB_HOST,
    user     : process.env.OPENSHIFT_MYSQL_DB_USERNAME,
    password : process.env.OPENSHIFT_MYSQL_DB_PASSWORD,
    port     : process.env.OPENSHIFT_MYSQL_DB_PORT,
    database : process.env.OPENSHIFT_APP_NAME,
    'dateStrings': 'date',
    _socket: process.env.OPENSHIFT_Cart_Name_DB_SOCKET,
    url: process.env.OPENSHIFT_MONGODB_DB_URL
};

var zuulSequelize = new Sequelize(sqlConnection.database, sqlConnection.user, sqlConnection.password, {
    host: sqlConnection.host,
    dialect: sqlConnection.dialect,
    port: sqlConnection.port,
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        freezeTableName: true,
        timestamps: false
    }
});

var zuuldb = {
    // tables
    "access": zuulSequelize.import('../lib/models/sequelize_models/access'),
    "device": zuulSequelize.import('../lib/models/sequelize_models/device'),
    "deviceFunction": zuulSequelize.import('../lib/models/sequelize_models/devicefunction'),
    "deviceKey": zuulSequelize.import('../lib/models/sequelize_models/devicekey'),
    "keyFunctionAssignment": zuulSequelize.import('../lib/models/sequelize_models/keyfunctionassignment'),
    "user": zuulSequelize.import('../lib/models/sequelize_models/user'),
    // views
    "accessDetails": zuulSequelize.import('../lib/models/sequelize_models/accessdetails'),
    "vDeviceDetails": zuulSequelize.import('../lib/models/sequelize_models/view_devicedetails'),
    "vDeviceFunctionDetails": zuulSequelize.import('../lib/models/sequelize_models/view_devicefunctiondetails'),
    "vDeviceKeyDetails": zuulSequelize.import('../lib/models/sequelize_models/view_devicekeydetails'),
    "vDeviceKeyFunctionDetails": zuulSequelize.import('../lib/models/sequelize_models/view_devicekeyfunctiondetails'),
    "vParticleDeviceKeyDetails": zuulSequelize.import('../lib/models/sequelize_models/view_particledevicekeydetails'),
    "vPublicDeviceFunctionId": zuulSequelize.import('../lib/models/sequelize_models/view_publicdevicefunctionid'),
    "vUserDetails": zuulSequelize.import('../lib/models/sequelize_models/view_userdetails'),
    "vVerifyDeviceToken": zuulSequelize.import('../lib/models/sequelize_models/view_verifydevicetoken'),
    "vVerifyKeyToken": zuulSequelize.import('../lib/models/sequelize_models/view_verifykeytoken'),
    "vVerifyKeyTerms": zuulSequelize.import('../lib/models/sequelize_models/view_verifykeyterms'),
    "vPublicDeviceFunctionDetails": zuulSequelize.import('../lib/models/sequelize_models/view_publicdevicefunctionid')
};

module.exports = {
    "sqlConnection": sqlConnection,
    "mongodb": mongodb,
    zuuldb: zuuldb
};

