
const express = require('express');

 
var RegisterRouter = express.Router();

var RegistrationController = require('../../../../controllers/registrationController')

console.log('ins reg');
RegisterRouter.post('/GetOTP', RegistrationController.GetOTP)
RegisterRouter.post('/Registration',  RegistrationController.Registration)
RegisterRouter.post('/VerifyOTP', RegistrationController.VerifyOTP)

//RegisterRouter.post('/GetLogin', RegistrationController.GetLogin)

module.exports = RegisterRouter;
