const Joi = require("@hapi/joi");
const OnlineTariffService = require('../../frameworks/services/Tariff/onlineTariff.service')


exports.AddOnlineTariff =  function (req, res) {
    console.log('Testing...')
    const {  source,partner_type,tag,corporate,source_geolocation,destination_geolocation,trip_type,vehicle_category,fuel,from_date,to_date,
        base_distance,base_rate_per_km,extra_rate_per_km,grt_fare,grt_waiting_time,waiting_charges,waiting_time,state_tax,toll_charges,
        other_charges,driver_allowance,night_charges,route_name,route_id,total_commission_value,
        mode,tariff_id,base_fare,commission_type_id,commission_type_name,commission_value,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;


    console.log('queryyyyyTruey', req.body);
    const addOnlineTariffSchema = Joi.object({
       // vehicle_category : Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        source: Joi.string().required(),
        partner_type: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        tag: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        corporate: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        source_geolocation: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        destination_geolocation: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        trip_type: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        vehicle_category: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        fuel: Joi.object().keys({id:Joi.number().required(),fuel_type:Joi.string().required()}).required().unknown(true),
        from_date : Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
        to_date: Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
        base_distance: Joi.number().positive().allow(0).required(),
        base_rate_per_km: Joi.number().positive().allow(0).required(),
        extra_rate_per_km: Joi.number().positive().allow(0).required(),
        grt_fare: Joi.number().positive().allow(0).required(),
        grt_waiting_time: Joi.object().keys({id:Joi.number().required()}).required().unknown(true),
        waiting_charges: Joi.number().positive().allow(0).required(),
        waiting_time: Joi.object().keys({id:Joi.number().required()}).required().unknown(true),
        state_tax: Joi.number().positive().allow(0).required(),
        toll_charges: Joi.number().positive().allow(0).required(),
        other_charges: Joi.number().positive().allow(0).required(),
        driver_allowance: Joi.number().positive().allow(0).required(),
        night_charges: Joi.number().positive().allow(0).required(),
        route_name: Joi.string().required(),
        
        route_id: Joi.number().positive().integer().required(),
        total_commission_value: Joi.number().positive().allow(0).required(),
        mode: Joi.string().required(),
        tariff_id: Joi.number().integer().required(),
        base_fare: Joi.number().positive().allow(0).required(),
        commission_type_id: Joi.number().required(),
        commission_type_name: Joi.string().required(),
        commission_value: Joi.number().positive().allow(0).required(),
        all_chk: Joi.boolean().required(),sunday_chk: Joi.boolean().required(),monday_chk: Joi.boolean().required(),
        tuesday_chk: Joi.boolean().required(),wednesday_chk: Joi.boolean().required(),
        thursday_chk: Joi.boolean().required(),friday_chk: Joi.boolean().required(),saturday_chk: Joi.boolean().required(),

    }).unknown(true);
    var validate_result = addOnlineTariffSchema.validate(req.body,
        );
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
    var weekDaysArray=[]
    var weekDays=''
    if (req.body.all_chk == true){
        weekDays ='1,2,3,4,5,6,7'
        console.log('weekDaysArray check all true',weekDays);
    }
    else{
        var sunday_value=1,monday_value=2,tuesday_value=3,wednesday_value=4,thursday_value=5,friday_value=6,saturday_value=7
        //weekDaysArray=[sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk];
        if (sunday_chk==true){weekDaysArray.push(sunday_value)}
        if (monday_chk==true){weekDaysArray.push(monday_value)}
        if (tuesday_chk==true){weekDaysArray.push(tuesday_value)}
        if (wednesday_chk==true){weekDaysArray.push(wednesday_value)}
        if (thursday_chk==true){weekDaysArray.push(thursday_value)}
        if (friday_chk==true){weekDaysArray.push(friday_value)}
        if (saturday_chk==true){weekDaysArray.push(saturday_value)}

        weekDays =weekDaysArray.toString();
        console.log('weekDaysArray check all false',weekDays);
    }

    try {
        var users =  OnlineTariffService.addOnlineTariff(req,res,weekDays)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetOnlineTariffdetails =  function (req, res) {
    console.log('Testing...')
    const { corporate,source_geolocation,destination_geolocation,trip_type,
        vehicle_category,fuel,from_date,to_date} = req.body;


    console.log('queryyyyyTruey', req.body);
    const getOnlineTariffdetailsSchema = Joi.object({
        //corporate : Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        corporate : Joi.object().keys({id:Joi.number().positive().required(),name:Joi.string().required()}).required().unknown(true),
        source_geolocation: Joi.object().keys({id:Joi.number().positive().required(),name:Joi.string().required()}).required().unknown(true),
        destination_geolocation: Joi.object().keys({id:Joi.number().positive().required(),name:Joi.string().required()}).required().unknown(true), 
        trip_type: Joi.object().keys({id:Joi.number().positive().required(),name:Joi.string().required()}).required().unknown(true),
        vehicle_category: Joi.object().keys({id:Joi.number().positive().required(),name:Joi.string().required()}).required().unknown(true),
        fuel: Joi.object().keys({id:Joi.number().positive().required(),fuel_type:Joi.string().required()}).required().unknown(true),
        from_date : Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
        to_date : Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
       
    }).unknown(true);
    var validate_result = getOnlineTariffdetailsSchema.validate(req.body,
        );
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(422).json({
            responseCode: -1,
            error: validate_result.error.details[0].message,
            data: []
        });
    }
     

    try {
        var users =  OnlineTariffService.getOnlineTariffdetails(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.ViewOnlineTariffdetails =  function (req, res) {
     
    const viewOnlineTariffdetailsSchema = Joi.object({
        // year: Joi.string().required(),
        // month: Joi.string().required(),
        // source_geolocation: Joi.required().allow(null),
        // destination_geolocation: Joi.required().allow(null),
        // status: Joi.required(),

        year:Joi.object({
            id:Joi.number().required(),
            name:Joi.string().optional()
        }).unknown(true).required(),
        
       month:Joi.object({
            id:Joi.number().required(),
            name:Joi.string().optional()
        }).unknown(true).required(),

        source_geolocation:Joi.object({
            id:Joi.number().optional(),
            name:Joi.string().optional()
        }).unknown(true).required().allow(null),

        destination_geolocation:Joi.object({
            id:Joi.number().optional(),
            name:Joi.string().optional()
        }).unknown(true).required().allow(null),

        status: Joi.required(),

               
    }).unknown(true);
    var validate_result = viewOnlineTariffdetailsSchema.validate(req.body,
        );
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
     

    try {
        var users =  OnlineTariffService.viewOnlineTariffdetails(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.EditOnlineTariffStatus =  function (req, res) {
     
    const editOnlineTariffStatusSchema = Joi.object({
         
        //tariff_id: Joi.required(),
        //status_id: Joi.required(),
        //source: Joi.string().required(),

               
    }).unknown(true);
    var validate_result = editOnlineTariffStatusSchema.validate(req.params,
        );
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(422).json({
            responseCode: -1,
            error: validate_result.error.details[0].message,
            data: []
        });
    }
     

    try {
        var users =  OnlineTariffService.editOnlineTariffStatus(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetOnlineTariffData =  function (req, res) {
     
    const getOnlineTariffDataSchema = Joi.object({
          
               
    }).unknown(true);
    var validate_result = getOnlineTariffDataSchema.validate(req.body,
        );
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }
     

    try {
        var users =  OnlineTariffService.getOnlineTariffData(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

