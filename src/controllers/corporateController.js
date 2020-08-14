const Joi = require("@hapi/joi");
const CorporateService = require('../frameworks/services/corporate.service')


exports.GetAssignedCorporates =  function (req, res) {
    console.log('Testing...')
    // const { emp_id } = req.body;
    // console.log('queryyyyyTruey', req.body);
    const getAssignedCorporatesSchema = Joi.object({
        //emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getAssignedCorporatesSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  CorporateService.getAssignedCorporates(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetAssignedDG_Corporates =  function (req, res) {
    console.log('Testing...')
    const { emp_id } = req.body;
    console.log('queryyyyyTruey', req.body);
    const getAssignedDG_CorporatesSchema = Joi.object({
        //emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getAssignedDG_CorporatesSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  CorporateService.getAssignedDG_Corporates(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}