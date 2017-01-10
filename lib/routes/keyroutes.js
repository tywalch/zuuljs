var keyController = require('../controllers/keycontroller');
var express 	  = require('express');
var keyrouter 	  = express.Router();

keyrouter.route('/new')
    .get(keyController.getNew)
    .post(keyController.postNew);

keyrouter.route('/new/:publicDeviceId')
    .get(keyController.getNewPublicDeviceId);

keyrouter.route('/edit/:publicKeyId')
    .get(keyController.getEditPublicKeyId)
    .post(keyController.postEditPublicKeyId);

keyrouter.route('/delete/:publicKeyId')
  .post(keyController.deletePublicKeyId);

keyrouter.route('/register')
    .get(keyController.getRegister)
    .post(keyController.postRegister);

keyrouter.route('/:publicKeyId')
    .get(keyController.getPublicKeyId);

module.exports = keyrouter;