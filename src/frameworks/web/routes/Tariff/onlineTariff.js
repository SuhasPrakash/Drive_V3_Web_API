
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var OnlineTariffRouter = express.Router();

var OnlineTariffController = require('../../../../controllers/Tariff/onlineTariffController')

console.log('ins add_online_tariff');
OnlineTariffRouter.post('/add_tariff',verifyToken, OnlineTariffController.AddOnlineTariff)
OnlineTariffRouter.post('/get_tariff',verifyToken, OnlineTariffController.GetOnlineTariffdetails)
OnlineTariffRouter.post('/view_tariff',verifyToken, OnlineTariffController.ViewOnlineTariffdetails)
OnlineTariffRouter.get('/edit_tariff_status/:tariff_id/:status_id/:source',verifyToken, OnlineTariffController.EditOnlineTariffStatus)
OnlineTariffRouter.get('/get_tariff_details/:tariff_id/:source',verifyToken, OnlineTariffController.GetOnlineTariffData)


module.exports = OnlineTariffRouter;