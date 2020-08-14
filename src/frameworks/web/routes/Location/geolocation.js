
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var GeolocationRouter = express.Router();

var GeolocationController = require('../../../../controllers/geolocationController')

console.log('ins reg GeolocationRouter');
 
GeolocationRouter.get('/GetFOLocation', GeolocationController.GetFOLocation)//using in Registration - Onboarding

GeolocationRouter.get('/source',verifyToken, GeolocationController.GetAllGeolocation)
GeolocationRouter.post('/destination',verifyToken, GeolocationController.GetDestinationBasedOnSource)
GeolocationRouter.get('/route_based_source',verifyToken, GeolocationController.GetRouteBasedSourceLocation)
GeolocationRouter.post('/route_based_destination',verifyToken, GeolocationController.GetRouteBasedDestinationLocation);

GeolocationRouter.get('/country',verifyToken, GeolocationController.GetCountry);
GeolocationRouter.post('/country_based_states',verifyToken, GeolocationController.GetStateBasedOnCountry);
GeolocationRouter.post('/state_based_cities',verifyToken, GeolocationController.GetCityBasedOnState);




module.exports = GeolocationRouter;
