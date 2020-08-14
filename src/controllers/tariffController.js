const Joi = require("@hapi/joi");
const TariffService = require('../frameworks/services/tariff.service')


exports.AddOfflineTariff =  function (req, res) {
    console.log('Testing...')
    const { emp_id,vehicle_category,from_date,to_date,
        trip_type,fuel_type,source,destination,
        base_fare,base_distance,extra_fare_per_km,driver_allowances, night_chargers,
        night_start_time,night_end_time,waiting_chargers,free_waiting_time,
        toll,state_tax,other_state_chargers,cgst_perc,sgst_perc,igst_perc,cess_perc
        ,mode,tariff_id,corporate,driver_extra_allowance,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;


    console.log('queryyyyyTruey', req.body);
    const addOfflineTariffSchema = Joi.object({
        emp_id: Joi.required().number(), vehicle_category: Joi.required(),from_date: Joi.required(), to_date: Joi.required(),
        trip_type: Joi.required(),fuel_type: Joi.required(),source: Joi.required(),destination: Joi.required(),
        base_fare: Joi.required(),base_distance: Joi.required(),extra_fare_per_km: Joi.required(),driver_allowances: Joi.required(),
        night_chargers: Joi.required(),night_start_time: Joi.required(),night_end_time: Joi.required(),waiting_chargers: Joi.required(),free_waiting_time: Joi.required(),
        toll: Joi.required(),state_tax: Joi.required(),other_state_chargers: Joi.required(),cgst_perc: Joi.required(),
        sgst_perc: Joi.required(),igst_perc: Joi.required(),cess_perc: Joi.required(),
        mode: Joi.required(),tariff_id: Joi.required(),corporate: Joi.required(),driver_extra_allowance: Joi.required(),
		all_chk:Joi.required(),sunday_chk: Joi.required(),monday_chk: Joi.required(),tuesday_chk: Joi.required(),
        wednesday_chk: Joi.required(),thursday_chk: Joi.required(),friday_chk: Joi.required(),saturday_chk: Joi.required(),

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
        console.log('BlackoutDays check all true',weekDays);
    }
    else{
        var sunday_value=1,monday_value=2,tuesday_value=3,wednesday_value=4,thursday_value=5,friday_value=6,saturday_value=7
        //blackoutDaysArray=[sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk];
        if (sunday_chk==true){weekDaysArray.push(sunday_value)}
        if (monday_chk==true){weekDaysArray.push(monday_value)}
        if (tuesday_chk==true){weekDaysArray.push(tuesday_value)}
        if (wednesday_chk==true){weekDaysArray.push(wednesday_value)}
        if (thursday_chk==true){weekDaysArray.push(thursday_value)}
        if (friday_chk==true){weekDaysArray.push(friday_value)}
        if (saturday_chk==true){blackoutDaysArray.push(saturday_value)}

        weekDays =weekDaysArray.toString();
        console.log('BlackoutDays check all false',weekDays);
    }

    try {
        var users =  TariffService.addOfflineTariff(req,res,weekDays)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}
