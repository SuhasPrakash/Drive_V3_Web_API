const Joi = require("@hapi/joi");
const GeolocationService = require('../frameworks/services/gelocation.service')


exports.GetFOLocation =  function (req, res) {
    console.log('Testing...')
    const { mobileno } = req.body;
    // console.log('queryyyyyTruey', req.body);
    // const getFOLocation = Joi.object({
    //     mobileno: Joi.number().required(),
    //     OTP:Joi.optional(), 
    // });
    // var validate_result = getFOLocation.validate(req.body);
    // if (validate_result.error) {
    //     console.log('Error in Validation', validate_result);
    //     return res.status(200).json({
    //         responseCode: null,
    //         error: validate_result.error.details[0].message,
    //         data: null
    //     });
    // }

    try {
        var users =  GeolocationService.getFOLocation(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetAllGeolocation =  function (req, res) {
    console.log('Testing...')
     
    const getAllGeolocationSchema = Joi.object({
        //emp_id: Joi.required()
    });
    var validate_result = getAllGeolocationSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getAllGeolocation(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetDestinationBasedOnSource =  function (req, res) {
    console.log('Testing...')
    const {source_geolocation} =req.body;
    console.log('queryyyyyTruey', req.body);
    const getDestinationBasedOnSourceSchema = Joi.object({
        //emp_id: Joi.required(),
         source_geolocation:Joi.object().keys({
             id:Joi.number().required(),
             name: Joi.string().optional(),
        }).required().unknown(true), 
        //source_geolocation : Joi.required(),
        
    }).unknown(true);
    var validate_result = getDestinationBasedOnSourceSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getDestinationBasedOnSource(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetRouteBasedSourceLocation =  function (req, res) {
    
    const getRouteBasedSourceLocationSchema = Joi.object({
        //emp_id: Joi.required()
    });
    var validate_result = getRouteBasedSourceLocationSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getRouteBasedSourceLocation(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetRouteBasedDestinationLocation =  function (req, res) {
    
    const getRouteBasedDestinationLocationSchema = Joi.object({
        source_geolocation: Joi.required()
    }).unknown(true);
    var validate_result = getRouteBasedDestinationLocationSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getRouteBasedDestinationLocation(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetCountry =  function (req, res) {
    
    const getCountrySchema = Joi.object({
        //source_geolocation: Joi.required()
    }).unknown(true);
    var validate_result = getCountrySchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getCountry(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}


exports.GetStateBasedOnCountry =  function (req, res) {
    
    const getStateBasedOnCountrySchema = Joi.object({
        country: Joi.required()
    }).unknown(true);
    var validate_result = getStateBasedOnCountrySchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getStateBasedOnCountry(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetCityBasedOnState =  function (req, res) {
    
    const getCityBasedOnStateSchema = Joi.object({
        country: Joi.required(),
        state: Joi.required()
    }).unknown(true);
    var validate_result = getCityBasedOnStateSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  GeolocationService.getCityBasedOnState(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}