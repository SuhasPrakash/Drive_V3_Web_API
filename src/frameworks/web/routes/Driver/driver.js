
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var DriverRouter = express.Router();

var DriverController = require('../../../../controllers/driverController')

console.log('ins driver');

DriverRouter.post('/add_driver',verifyToken, DriverController.InsDriverDetails)
DriverRouter.get('/get_driver_list_view', verifyToken,DriverController.getDriverListViewDetails)

DriverRouter.post('/drivers_map_view', DriverController.GetDriversMapView)
DriverRouter.get('/get_driver_profile/:driver_emp_id',verifyToken, DriverController.GetDriverProfileDetails)





module.exports = DriverRouter;