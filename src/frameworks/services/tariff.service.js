const dbpool = require('../Database/db');

 
exports.addOfflineTariff = async function (req,res,weekDays) {
    console.log('requestttt',req.body);
    const { emp_id,vehicle_category,from_date,to_date,
        trip_type,fuel_type,source,destination,
        base_fare,base_distance,extra_fare_per_km,driver_allowances, night_chargers,
        night_start_time,night_end_time,waiting_chargers,free_waiting_time,
        toll,state_tax,other_state_chargers,cgst_perc,sgst_perc,igst_perc,cess_perc
        ,mode,tariff_id,corporate,driver_extra_allowance,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;
    try {
        dbpool.then((pool) => {
            let query = "exec InsVendorOfflineTariff_API  @Empid='" + emp_id 
            + "', @GeoLocationId='"+source.id
            + "', @TriptypeId='"+trip_type.id
            + "', @VehicleCategoryId='"+vehicle_category.id
            + "', @FuelTypeId='"+fuel_type.id
            + "', @SourceroutesId='"+source.id
            + "', @Sourceroutes='"+source.name
            + "', @DestinationroutesId='"+destination.id
            + "', @Destinationroutes='"+destination.name
            + "', @BaseFare='"+base_fare
            + "', @BaseDistance='"+base_distance
            + "', @ExtrafareperKM='"+extra_fare_per_km
            + "', @DriverAllowances='"+driver_allowances
            + "', @NightChargers='"+night_chargers
            + "', @NightStartTime='"+night_start_time
            + "', @NightEndTime='"+night_end_time
            + "', @WaitingCharges='"+waiting_chargers
            + "', @FreeWaitingTime='"+free_waiting_time

            + "', @Toll='"+toll
            + "', @StateTax='"+state_tax
            + "', @OtherStateCharges='"+other_state_chargers
            + "', @CGST='"+cgst_perc
            + "', @SGST='"+sgst_perc
            + "', @IGST='"+igst_perc
            + "', @CESS='"+cess_perc

            + "', @Mode='"+mode
            + "', @TariffId='"+tariff_id
            + "', @weekdays='"+weekDays
            + "', @fromdate='"+from_date.year +"-" +from_date.month +"-" +from_date.day
            + "', @todate='"+to_date.year +"-" +to_date.month +"-" +to_date.day
            + "', @Corpid='"+corporate.id
            + "', @CorporateName='"+corporate.name
            + "', @DriverExtraAllowance='"+driver_extra_allowance
            +"'";
            console.log('queryyyyyy', query);
            pool.request().query(query, function (err, result) {
                if (err) {
                    console.log('while creating pool req', err);
                    return res.status(200).json({
                        responseCode: 3,
                        error: 'Request was unable to process',
                        response: null
                    });
                }
                const message = result.recordset[0].response;
                const success = result.recordset[0].success;
                if (success == 'true') {
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
                        data: result.recordset,
                    });
                }
                else {
                    return res.status(200).json({
                        responseCode: 2,
                        message: message,
                        data: result.recordset,
                    });
                }
            });
        });

    } catch (error) {
        console.log('Error in 1st catch ', error);
        return res.status(400).json({
            responseCode: '400',
            error: "Unable to process your request",
            response: error
        });
    } 
}
