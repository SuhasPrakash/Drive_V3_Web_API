
const express = require('express');
const verifyToken = require("../../../../auth/VerifyToken");
 
var OnboardingRouter = express.Router();

var OnboardingController = require('../../../../controllers/onboardingController')

console.log('ins reg');
OnboardingRouter.post('/InsFoDetails',verifyToken, OnboardingController.InsFoDetails)
OnboardingRouter.post('/GetFOPartnerType',verifyToken, OnboardingController.GetFOPartnerType)
OnboardingRouter.get('/GetData/:tabId',verifyToken, OnboardingController.GetData)
OnboardingRouter.post('/GetDocProofType',verifyToken, OnboardingController.GetDocProofType)
OnboardingRouter.get('/GetRegistrationStatus',verifyToken, OnboardingController.GetRegistrationStatus)

OnboardingRouter.post('/InsFoBankDetails',verifyToken, OnboardingController.InsFoBankDetails)
OnboardingRouter.post('/InsFoFleetDetails',verifyToken, OnboardingController.InsFoFleetDetails)
OnboardingRouter.post('/UploadFoFleetDocuments',verifyToken, OnboardingController.UploadFoFleetDocuments)
OnboardingRouter.post('/UploadFoFleetProprietorDocuments',verifyToken, OnboardingController.UploadFoFleetProprietorDocuments)
OnboardingRouter.post('/UploadFoFleetCompanyDocuments',verifyToken, OnboardingController.UploadFoFleetCompanyDocuments)
OnboardingRouter.post('/UploadFoFleetPartnershipDocuments',verifyToken, OnboardingController.UploadFoFleetPartnershipDocuments)

OnboardingRouter.post('/legal_acceptance',verifyToken, OnboardingController.InsLegalAcceptance)

module.exports = OnboardingRouter;
