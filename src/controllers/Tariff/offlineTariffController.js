const Joi = require("@hapi/joi");
const OfflineTariffService = require('../../frameworks/services/Tariff/offlineTariff.service')

exports.AddOfflineTariff =  function (req, res) {
    console.log('Testing...')
    const { vehicle_category,from_date,to_date,
        trip_type,fuel,source_geolocation,destination_geolocation,
        base_fare,base_distance,extra_fare_per_km,driver_allowances, night_chargers,
        night_start_time,night_end_time,waiting_chargers,free_waiting_time,
        toll,state_tax,other_state_chargers,cgst_perc,sgst_perc,igst_perc,cess_perc
        ,mode,tariff_id,corporate,driver_extra_allowance,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;


    console.log('queryyyyyTruey', req.body);
    const addOfflineTariffSchema = Joi.object({
         
        vehicle_category: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        from_date : Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
        to_date: Joi.object().keys({year:Joi.number().required(),month:Joi.number().required(),day:Joi.number().required()}).required().unknown(true),
        trip_type: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        fuel: Joi.object().keys({id:Joi.number().required(),fuel_type:Joi.string().required()}).required().unknown(true),
        source_geolocation: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        destination_geolocation: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        base_fare: Joi.number().positive().allow(0).required(),
        base_distance: Joi.number().positive().allow(0).required(),
        extra_fare_per_km: Joi.number().positive().allow(0).required(),
        driver_allowances: Joi.number().positive().allow(0).required(),
        night_chargers: Joi.number().positive().allow(0).required(),
        night_start_time: Joi.string().required(),
        night_end_time: Joi.string().required(),
        waiting_chargers: Joi.number().positive().allow(0).required(),
        
        free_waiting_time: Joi.object().keys({id:Joi.number().required()}).required().unknown(true),
        toll: Joi.number().positive().allow(0).required(),
        state_tax: Joi.number().positive().allow(0).required(),
        other_state_chargers: Joi.number().positive().allow(0).required(),
        cgst_perc: Joi.number().positive().allow(0).required(),
        sgst_perc: Joi.number().positive().allow(0).required(),
        igst_perc: Joi.number().positive().allow(0).required(),
        cess_perc: Joi.number().positive().allow(0).required(),
        mode: Joi.string().required(),
        tariff_id: Joi.required(),
        corporate: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
        driver_extra_allowance: Joi.number().positive().allow(0).required(),
		all_chk: Joi.boolean().required(),sunday_chk: Joi.boolean().required(),monday_chk: Joi.boolean().required(),
        tuesday_chk: Joi.boolean().required(),wednesday_chk: Joi.boolean().required(),
        thursday_chk: Joi.boolean().required(),friday_chk: Joi.boolean().required(),saturday_chk: Joi.boolean().required(),

    }).unknown(true);
    var validate_result = addOfflineTariffSchema.validate(req.body,
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
        var users =  OfflineTariffService.addOfflineTariff(req,res,weekDays)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.ViewOfflineTariffdetails =  function (req, res) {
     
    const viewOfflineTariffdetailsSchema = Joi.object({
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
    var validate_result = viewOfflineTariffdetailsSchema.validate(req.body,
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
        var users =  OfflineTariffService.viewOfflineTariffdetails(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.EditOfflineTariffStatus =  function (req, res) {
     
    const editOfflineTariffStatusSchema = Joi.object({
         
        //tariff_id: Joi.required(),
        //status_id: Joi.required(),
        //source: Joi.string().required(),

               
    }).unknown(true);
    var validate_result = editOfflineTariffStatusSchema.validate(req.params,
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
        var users =  OfflineTariffService.editOfflineTariffStatus(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}