
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var VehicleRouter = express.Router();

var VehicleController = require('../../../../controllers/vehicleController')

console.log('ins vehicle');
VehicleRouter.get('/vehicle_category',verifyToken, VehicleController.GetVehicleCategory)
VehicleRouter.post('/category_based_vehicles',verifyToken, VehicleController.GetVehicleBasedOnCategory)
VehicleRouter.post('/get_vehicle_inventory',verifyToken, VehicleController.GetVehicleInventory)
////VehicleRouter.post('/GetVehicleCategory',verifyToken, VehicleController.GetVehicleCategory)

module.exports = VehicleRouter;