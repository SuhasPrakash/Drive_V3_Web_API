const Joi = require("@hapi/joi");
const VehicleService = require('../frameworks/services/vehicle.service')


exports.GetVehicleCategory =  function (req, res) {
    console.log('Testing...')
     
    console.log('queryyyyyTruey', req.body);
    const getVehicleCategorySchema = Joi.object({
       // emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getVehicleCategorySchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  VehicleService.getVehicleCategory(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetVehicleBasedOnCategory =  function (req, res) {
    console.log('Testing...')
    const { vehicle_category } = req.body;
    console.log('queryyyyyTruey', req.body);
    const getVehicleBasedOnCategorySchema = Joi.object({
        //emp_id: Joi.required(),
        vehicle_category: Joi.required()
    }).unknown(true);
    var validate_result = getVehicleBasedOnCategorySchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  VehicleService.getVehicleBasedOnCategory(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetVehicleInventory =  function (req, res) {
    console.log('Testing...')
    const { vehicle_category } = req.body;
    const getVehicleInventorySchema = Joi.object({
        //emp_id: Joi.required(),
        source_geolocation:Joi.object({
            id:Joi.number().optional(),
            name:Joi.string().optional()
       }).unknown(true).required().allow(null),

       destination_geolocation:Joi.object({
            id:Joi.number().optional(),
            name:Joi.string().optional()
       }).unknown(true).required().allow(null),

        trip_type:Joi.object({
            id:Joi.number().optional(),
            name:Joi.string().optional()
       }).unknown(true).required().allow(null),
       
        vehicle_category:Joi.object({
            id:Joi.number().optional(),
            name:Joi.string().optional()
       }).unknown(true).required().allow(null), 

       date : Joi.object().keys({
           year:Joi.number().required(),
           month:Joi.number().required(),
           day:Joi.number().required()
        }).required().unknown(true),


    }).unknown(true);
    var validate_result = getVehicleInventorySchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  VehicleService.getVehicleInventory(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}
 