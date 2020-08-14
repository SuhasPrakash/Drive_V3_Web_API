
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var CorporateRouter = express.Router();

var CorporateController = require('../../../../controllers/corporateController')

console.log('ins CorporateRouter');
CorporateRouter.get('/assigned_corporates',verifyToken, CorporateController.GetAssignedCorporates);
CorporateRouter.get('/dg_corporates',verifyToken, CorporateController.GetAssignedDG_Corporates);

module.exports = CorporateRouter;