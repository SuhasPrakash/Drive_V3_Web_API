
const Joi = require("@hapi/joi");
const RegisterService = require('../frameworks/services/registration.service')

//const dbpool = require('../frameworks/Database/db');
//Adding business login and validation here

exports.GetOTP =  function (req, res) {
    console.log('Testing...')
    const { mobileno } = req.body;
    console.log('queryyyyyTruey', req.body);
    const getOTPSchema = Joi.object({
        mobileno: Joi.number().required(),
        OTP:Joi.optional(), 
    });
    var validate_result = getOTPSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  RegisterService.getOTP(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.Registration =  function (req, res) {
    console.log('Testing...')
     
    const { mobileno } = req.body;
    console.log('queryyyyyTruey', req.body);
    const registrationSchema = Joi.object({
        mobileno: Joi.number().required()  
    });
    var validate_result = registrationSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  RegisterService.register(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }

}
exports.VerifyOTP =  function (req, res) {
    console.log('Testing...')
    const { mobileno, otp } = req.body;
    console.log('queryyyyyTruey', req.body);
     
    const verifyOTPSchema = Joi.object({
        mobileno: Joi.number().required(),  
        otp: Joi.number().required()
    });
    var validate_result = verifyOTPSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  RegisterService.verifyOTP(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }

}

exports.GetLogin =  function (req, res) {
    console.log('Testing...')
    const { otp, mobileno } = req.body;
    console.log('queryyyyyTruey', req.body);
    const getLoginSchema = Joi.object({
        mobileno: Joi.number().required(),
        otp: Joi.number().required()   
    });
    var validate_result = getLoginSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  RegisterService.getLogin(req, res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }

}

