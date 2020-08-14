
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var OfflineTariffRouter = express.Router();

var OfflineTariffController = require('../../../../controllers/Tariff/offlineTariffController')

console.log('ins add_offline_tariff');
OfflineTariffRouter.post('/add_offline_tariff',verifyToken, OfflineTariffController.AddOfflineTariff)
OfflineTariffRouter.post('/view_tariff',verifyToken, OfflineTariffController.ViewOfflineTariffdetails)
OfflineTariffRouter.get('/edit_tariff_status/:tariff_id/:status_id/:source',verifyToken, OfflineTariffController.EditOfflineTariffStatus)



module.exports = OfflineTariffRouter;