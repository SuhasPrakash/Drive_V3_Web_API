const Joi = require("@hapi/joi");
const DocumentService = require('../../frameworks/services/Document/document.service')



exports.UploadDocument =  function (req, res) {
    //const file = req.file;
    //console.log("Upload", file.filename);
    
    const uploadDocumentSchema = Joi.object({
       
       file : Joi.required(),
       items : Joi.object().keys({doc_folder:Joi.string().required(),doc_type:Joi.string().required()}).required().unknown(true),
        
    }).unknown(true);
    var validate_result = uploadDocumentSchema.validate(req.file);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    

    try {
        var users =  DocumentService.uploadDocument(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}