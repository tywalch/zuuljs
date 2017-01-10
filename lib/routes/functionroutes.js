var functionController = require('../controllers/functioncontroller');
var express 		   = require('express');
var functionRouter 	   = express.Router();


functionRouter.route('/new')
    .get(functionController.getNew)
    .post(functionController.postNew);

functionRouter.route('/new/:publicDeviceId')
    .get(functionController.getNewPublicDeviceId);

functionRouter.route('/edit/:publicDeviceFunctionId')
    .get(functionController.getEditPublicDeviceFunctionId)
    .post(functionController.patchEditPublicDeviceFunctionId);

functionRouter.route('/delete/:publicDeviceFunctionId')
  .post(functionController.deletePublicDeviceFunctionId);

functionRouter.route('/status/:publicDeviceFunctionId')
    .get(functionController.getFunctionStatus);

functionRouter.route('/call/:publicDeviceFunctionId')
    .post(functionController.postFunctionCall);

module.exports = functionRouter;