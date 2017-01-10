var express 		 = require('express');
var deviceController = require('../controllers/devicecontroller');
var deviceRouter 	 = express.Router();

deviceRouter.route('/new')
    .get(deviceController.getNew)
    .post(deviceController.postNew);

deviceRouter.route('/register')
    .get(deviceController.getRegister)
    .post(deviceController.postRegister);

deviceRouter.route('/:publicDeviceId')
    .get(deviceController.getPublicDeviceId);

deviceRouter.route('/:publicDeviceId/edit')
    .get(deviceController.getEditPublicDeviceId)
    .post(deviceController.postEditPublicDeviceId);

deviceRouter.route('/:publicDeviceId/delete')
  .post(deviceController.deletePublicDeviceId);

deviceRouter.route('/status/:publicDeviceId')
    .get(deviceController.getDeviceStatus);

deviceRouter.route('/status/:publicDeviceId')
    .get(deviceController.getDeviceStatus);

module.exports = deviceRouter;