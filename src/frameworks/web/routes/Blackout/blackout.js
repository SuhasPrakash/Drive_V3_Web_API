
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var BlackoutRouter = express.Router();

var BlackoutController = require('../../../../controllers/blackoutController')

console.log('ins add_blackoutdays');
BlackoutRouter.post('/add_blackoutdays',verifyToken, BlackoutController.InsBlackoutDays)
BlackoutRouter.get('/get_blackoutdays',verifyToken, BlackoutController.GetBlackoutDays)
BlackoutRouter.post('/delete_blackoutdays',verifyToken, BlackoutController.DeleteBlackoutDays)
BlackoutRouter.post('/edit_blackoutdays',verifyToken, BlackoutController.EditBlackoutDays)
////BlackoutRouter.post('/InsBlackoutDays',verifyToken, BlackoutController.InsBlackoutDays)

module.exports = BlackoutRouter;