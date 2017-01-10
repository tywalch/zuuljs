var express 		 = require('express');
var profileController = require('../controllers/profilecontroller');
var profileRouter 	 = express.Router();

profileRouter.route('/')
  .get(profileController.getProfile)
  .post(profileController.postProfile);

module.exports = profileRouter;