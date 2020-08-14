
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");

 
var DocumentRouter = express.Router();

var DocumentController = require('../../../../controllers/Document/documentController')

console.log('ins Document');
DocumentRouter.post('/upload', DocumentController.UploadDocument)
//DocumentRouter.post('/add_driver',verifyToken, DocumentController.InsDriverDetails)

 


module.exports = DocumentRouter;