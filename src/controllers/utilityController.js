const Joi = require("@hapi/joi");
const utilityService = require('../frameworks/services/utility.service')


exports.TestJoiValidation =  function (req, res) {


    const { languages} = req.body;
     
    const getThirdpartyTripTypeSchema = Joi.object({
        // all_chk: Joi.boolean().required(),
        // base_distance: Joi.number().positive().allow(0).required(),
        // base_rate_per_km: Joi.number().positive().allow(0).required(),
        // corporate : Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        // total_commission_value: Joi.number().positive().allow(0).required(),
        // route_name: Joi.string().required(),
        languages: Joi.required(),
        //from_date : Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
    }).unknown(true);
    var validate_result = getThirdpartyTripTypeSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    console.log('languages',languages);
    var lang_ids_Array=[]
    var lang_ids=''
    for(var i = 0; i < languages.length;i++)
    {
        lang_ids_Array.push(languages[i].id)
        console.log('lang_ids_Arrayfor loop',lang_ids_Array);
    }  

    lang_ids =lang_ids_Array.toString();
    console.log('langid',lang_ids);



    try {
        var users =  utilityService.getThirdpartyTripType(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetThirdpartyTripType =  function (req, res) {
     
    const getThirdpartyTripTypeSchema = Joi.object({
        //emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getThirdpartyTripTypeSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  utilityService.getThirdpartyTripType(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetFuelType =  function (req, res) {
    
    const getFuelTypeSchema = Joi.object({
        //emp_id: Joi.required(),
    }).unknown(true);
    
    var validate_result = getFuelTypeSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  utilityService.getFuelType(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetRouteBasedFuelType =  function (req, res) {
    
    const getRouteBasedFuelTypeSchema = Joi.object({
        //emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getRouteBasedFuelTypeSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  utilityService.getRouteBasedFuelType(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetTagBasedOnVendor =  function (req, res) {
    
    const getTagBasedOnVendorSchema = Joi.object({
        //emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getTagBasedOnVendorSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  utilityService.getTagBasedOnVendor(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.AddTagBasedOnVendor =  function (req, res) {
    
    const addTagBasedOnVendorSchema = Joi.object({
        tag_name: Joi.required()
    }).unknown(true);
    var validate_result = addTagBasedOnVendorSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  utilityService.addTagBasedOnVendor(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

