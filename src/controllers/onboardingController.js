const Joi = require("@hapi/joi");
const OnboardingService = require('../frameworks/services/onboarding.service')


exports.InsFoDetails =  function (req, res) {
    console.log('InsFoDetails...')
    const {Name,DOB,Gender,CityOperations,Email,TabId,ProgressStatus} = req.body;
    console.log('queryyyyyTruey', req.body);
    const insFoDetailsSchema = Joi.object({
        Name: Joi.string().required(),
        DOB: Joi.required(),
        Gender: Joi.required(),
        CityOperations: Joi.required(),
        Email: Joi.string().required(),
        TabId: Joi.number().required(),
        ProgressStatus: Joi.number().required(),///check with front end team
       
    });
    var validate_result = insFoDetailsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.insFoDetails(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetFOPartnerType = function (req, res) {
    console.log('Testing...')
    const {VendorId,UserId,EmpId} =req.body;
    console.log('queryyyyyTruey', req.body);
    const getFOPartnerTypeSchema = Joi.object({
        VendorId: Joi.required(),
        UserId: Joi.required(),
        EmpId: Joi.required()
       
    });
    var validate_result = getFOPartnerTypeSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users = OnboardingService.getFOPartnerType(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr', e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetData = function (req, res) {
    console.log(req.params.tabId);
    const  TabId  = req.params.tabId;
     
    try {
        var users = OnboardingService.getData(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr', e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetDocProofType = function (req, res) {
    console.log('Testing...')
    const {VendorId,UserId,EmpId} =req.body;
    console.log('queryyyyyTruey', req.body);
    const getDocProofTypeSchema = Joi.object({
        VendorId: Joi.required(),
        UserId: Joi.required(),
        EmpId: Joi.required()
       
    });
    var validate_result = getDocProofTypeSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users = OnboardingService.getDocProofType(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr', e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetRegistrationStatus = function (req, res) {
    console.log('Testing...')
     

    try {
        var users = OnboardingService.getRegistrationStatus(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr', e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.InsFoBankDetails =  function (req, res) {
    console.log(req.body);
  const {BankName,IFSC,AccountHolderName,AccountNo,BankProoftype,TabId,Status,DocumentPath} = req.body;

    console.log('queryyyyyTruey', req.body);
    const insFoBankDetailsSchema = Joi.object({
        BankName: Joi.string().required(),
        IFSC: Joi.string().required(),
        AccountHolderName: Joi.string().required(),
        AccountNo: Joi.required(),
        BankProoftype: Joi.required(),
        TabId: Joi.number().optional(),
        Status: Joi.optional(),
        DocumentPath: Joi.optional(),
        mobileno:Joi.optional(),
        
       
    });
    var validate_result = insFoBankDetailsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.insFoBankDetails(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.InsFoFleetDetails =  function (req, res) {
    console.log(req.body);
  
    const {partnertype,vehicleno1,DocumentPath1,vehicleno2,DocumentPath2,vehicleno3,DocumentPath3 } = req.body;

    console.log('queryyyyyTruey', req.body);
    const insFoFleetDetailsSchema = Joi.object({
        partnertype: Joi.required(),
        vehicleno1: Joi.required(),
        DocumentPath1: Joi.required(),
        vehicleno2: Joi.required(),
        DocumentPath2: Joi.required(),
        vehicleno3: Joi.required(),
        DocumentPath3: Joi.required(),
        mobileno:Joi.optional(),
        TabId:Joi.optional(),
        ProgressStatus:Joi.optional(),
    });
    var validate_result = insFoFleetDetailsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.insFoFleetDetails(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.UploadFoFleetDocuments =  function (req, res) {
    console.log(req.body);
  
    const { PhotoFilePath, PhotoBackSideFilePath, pannumber, PanFilePath, address, AddressProofFilePath,addressprooftype } = req.body;

    console.log('queryyyyyTruey', req.body);
    const uploadFoFleetDocumentsSchema = Joi.object({
        UploadPhotographfile: Joi.optional(),
        pannumber: Joi.required(),
        uploadpancopyfile: Joi.optional(),
        address: Joi.required(),
        addressprooftype : Joi.required(),
        uploadaddressproofbackfile: Joi.optional(),
        uploadaddressprooffrontfile: Joi.optional(),
        mobileno:Joi.optional(),
        TabId:Joi.optional(),
        ProgressStatus:Joi.optional(),
        partnertypeid:Joi.optional(),
    });
    var validate_result = uploadFoFleetDocumentsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.uploadFoFleetDocuments(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.UploadFoFleetProprietorDocuments =  function (req, res) {
    console.log(req.body);
  
    const { GSTNo, ProgressStatus, TabId, UploadPhotographfile, mobileno, pannumber, partnertypeid, proprietorprooftype,
        uploadGSTcopyfile, uploadpancopyfile, uploadproprietorprooffile, } = req.body;
 
    const uploadFoFleetProprietorDocumentsSchema = Joi.object({
        GSTNo: Joi.required(),
        ProgressStatus: Joi.required(),
        TabId: Joi.required(),
        UploadPhotographfile: Joi.optional(),
        pannumber: Joi.required(),
        partnertypeid: Joi.required(),
        proprietorprooftype: Joi.required(),
        uploadGSTcopyfile: Joi.required(),
        uploadpancopyfile: Joi.required(),
        uploadproprietorprooffile: Joi.required(),
        mobileno:Joi.optional(),
    });
    var validate_result = uploadFoFleetProprietorDocumentsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.uploadFoFleetProprietorDocuments(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.UploadFoFleetCompanyDocuments =  function (req, res) {
    console.log(req.body);
  
    const { CINNumber, ProgressStatus, TabId, UploadPhotographfile, mobileno, pannumber,
        partnertypeid, uploadincorporationcopyfile, uploadpancopyfile,} = req.body;
 
    const uploadFoFleetCompanyDocumentsSchema = Joi.object({
        CINNumber: Joi.required(),
        ProgressStatus: Joi.required(),
        TabId: Joi.required(),
        UploadPhotographfile: Joi.optional(),
        pannumber: Joi.required(),
        partnertypeid: Joi.required(),
        uploadincorporationcopyfile: Joi.optional(),
        uploadpancopyfile: Joi.optional(),
        mobileno:Joi.optional(),
    });
    var validate_result = uploadFoFleetCompanyDocumentsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.uploadFoFleetCompanyDocuments(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.UploadFoFleetPartnershipDocuments =  function (req, res) {
    console.log(req.body);
  
    const { ProgressStatus, TabId, UploadPhotographfile, mobileno, pannumber, 
        partnertypeid, uploadpartnershipcopyfile, uploadpancopyfile } = req.body;
 
    const UploadFoFleetPartnershipDocumentsSchema = Joi.object({
        ProgressStatus: Joi.required(),
        TabId: Joi.required(),
        UploadPhotographfile: Joi.optional(),
        pannumber: Joi.required(),
        partnertypeid: Joi.required(),
        uploadpancopyfile: Joi.optional(),
        uploadpartnershipcopyfile: Joi.optional(),
        mobileno:Joi.optional(),
    });
    var validate_result = UploadFoFleetPartnershipDocumentsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  OnboardingService.UploadFoFleetPartnershipDocuments(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.InsLegalAcceptance = function (req, res) {
    console.log('Testing...')
    const {legal_status} =req.body;
    console.log('queryyyyyTruey', req.body);
    const insLegalAcceptanceSchema = Joi.object({
        legal_status: Joi.boolean().required(),
                
    });
    var validate_result = insLegalAcceptanceSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users = OnboardingService.insLegalAcceptance(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr', e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}