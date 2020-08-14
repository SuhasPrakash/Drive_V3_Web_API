const Joi = require("@hapi/joi");
const BlackoutService = require('../frameworks/services/blackout.service')


exports.InsBlackoutDays =  function (req, res) {
    console.log('Testing...')
    const { vehicle_category,from_date,to_date,from_time,to_time,vehicle,mode,id,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;
    console.log('queryyyyyTruey', req.body);
    const insBlackoutDaysSchema = Joi.object({
       // emp_id: Joi.required(),
        vehicle_category : Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        from_date: Joi.required(),
        to_date: Joi.required(),
        from_time: Joi.required(),
        to_time: Joi.required(),
        vehicle: Joi.object().keys({id:Joi.number().required(),vehicle_number:Joi.string().required()}).required().unknown(true),
        mode:Joi.required(),
        id: Joi.required(),
		all_chk:Joi.required(),
		sunday_chk: Joi.required(),
		monday_chk: Joi.required(),
		tuesday_chk: Joi.required(),
		wednesday_chk: Joi.required(),
		thursday_chk: Joi.required(),
		friday_chk: Joi.required(),
		saturday_chk: Joi.required()
    }).unknown(true);
    var validate_result = insBlackoutDaysSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    var blackoutDaysArray=[]
    var blackoutDays=''
    if (req.body.all_chk == true){
        blackoutDays ='1,2,3,4,5,6,7'
        console.log('BlackoutDays check all true',blackoutDays);
    }
    else{
        var sunday_value=1,monday_value=2,tuesday_value=3,wednesday_value=4,thursday_value=5,friday_value=6,saturday_value=7
        //blackoutDaysArray=[sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk];
        if (sunday_chk==true){blackoutDaysArray.push(sunday_value)}
        if (monday_chk==true){blackoutDaysArray.push(monday_value)}
        if (tuesday_chk==true){blackoutDaysArray.push(tuesday_value)}
        if (wednesday_chk==true){blackoutDaysArray.push(wednesday_value)}
        if (thursday_chk==true){blackoutDaysArray.push(thursday_value)}
        if (friday_chk==true){blackoutDaysArray.push(friday_value)}
        if (saturday_chk==true){blackoutDaysArray.push(saturday_value)}

        blackoutDays =blackoutDaysArray.toString();
        console.log('BlackoutDays check all false',blackoutDays);
    }

    try {
        var users =  BlackoutService.insBlackoutDays(req,res,blackoutDays)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetBlackoutDays =  function (req, res) {
    console.log('Testing...')
     
    const getBlackoutDaysSchema = Joi.object({
         
    }).unknown(true);
    var validate_result = getBlackoutDaysSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    try {
        var users =  BlackoutService.getBlackoutDays(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.DeleteBlackoutDays =  function (req, res) {
    console.log('Testing...')
    const { blackout_id } = req.body;
    console.log('queryyyyyTruey', req.body);
    const deleteBlackoutDaysSchema = Joi.object({
        blackout_id: Joi.required(),
        
    }).unknown(true);
    var validate_result = deleteBlackoutDaysSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
     

    try {
        var users =  BlackoutService.deleteBlackoutDays(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.EditBlackoutDays =  function (req, res) {
    console.log('Testing...')
    const { blackout_id } = req.body;
    console.log('queryyyyyTruey', req.body);
    const editBlackoutDaysSchema = Joi.object({
        blackout_id: Joi.required(),
        
    }).unknown(true);
    var validate_result = editBlackoutDaysSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
     

    try {
        var users =  BlackoutService.editBlackoutDays(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}