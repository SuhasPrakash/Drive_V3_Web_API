const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

var utilityRouter = express.Router();

var utilityController = require('../../../../controllers/utilityController')

console.log('ins reg utilityRouter');

utilityRouter.post('/test_joi_validation',verifyToken, utilityController.TestJoiValidation);

utilityRouter.get('/thirdparty_trip_type',verifyToken, utilityController.GetThirdpartyTripType)
utilityRouter.get('/fuel_type',verifyToken, utilityController.GetFuelType);
utilityRouter.get('/route_based_fuel_type',verifyToken, utilityController.GetRouteBasedFuelType);
utilityRouter.get('/vendor_based_tag',verifyToken, utilityController.GetTagBasedOnVendor);
utilityRouter.post('/add_tag',verifyToken, utilityController.AddTagBasedOnVendor);


module.exports = utilityRouter;