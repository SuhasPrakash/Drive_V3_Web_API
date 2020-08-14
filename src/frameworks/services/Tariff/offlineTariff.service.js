const dbpool = require('../../Database/db');


exports.addOfflineTariff = async function (req,res,weekDays) {
    console.log('requestttt',req.body);
    const { vehicle_category,from_date,to_date,
        trip_type,fuel,source_geolocation,destination_geolocation,
        base_fare,base_distance,extra_fare_per_km,driver_allowances, night_chargers,
        night_start_time,night_end_time,waiting_chargers,free_waiting_time,
        toll,state_tax,other_state_chargers,cgst_perc,sgst_perc,igst_perc,cess_perc
        ,mode,tariff_id,corporate,driver_extra_allowance,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;
    try {
        dbpool.then((pool) => {
            let query = "exec InsVendorOfflineTariff_API  @Empid='" + req.userdetails.user_id 
            + "', @GeoLocationId='"+source_geolocation.id
            + "', @TriptypeId='"+trip_type.id
            + "', @VehicleCategoryId='"+vehicle_category.id
            + "', @FuelTypeId='"+fuel.id
            + "', @SourceroutesId='"+source_geolocation.id
            + "', @Sourceroutes='"+source_geolocation.name
            + "', @DestinationroutesId='"+destination_geolocation.id
            + "', @Destinationroutes='"+destination_geolocation.name
            + "', @BaseFare='"+base_fare
            + "', @BaseDistance='"+base_distance
            + "', @ExtrafareperKM='"+extra_fare_per_km
            + "', @DriverAllowances='"+driver_allowances
            + "', @NightChargers='"+night_chargers
            + "', @NightStartTime='"+night_start_time
            + "', @NightEndTime='"+night_end_time
            + "', @WaitingCharges='"+waiting_chargers
            + "', @FreeWaitingTime='"+free_waiting_time.id

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

exports.viewOfflineTariffdetails = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
    const { year,month,source_geolocation,destination_geolocation,status} = req.body;

    source_geolocation_id = ( req.body.source_geolocation == null?'0':req.body.source_geolocation.id);
    destination_geolocation_id = ( req.body.destination_geolocation == null?'0':req.body.destination_geolocation.id);

    try{
        dbpool.then((pool)=>{
            let query = "exec Get_OfflineTariff_Details_V1  @empid="+req.userdetails.user_id
            +",@year='"+year.id
            +"',@Month='"+month.id
            +"',@sourceId="+source_geolocation_id
            +",@destinationId="+destination_geolocation_id
            +",@status='"+status
            +"'"; 

            console.log('queryquery',query);

            pool.request().query(query,function(err,result){
                if(err){
                    console.log('while creating pool req',err);
                    return res.status(200).json({
                        responseCode:null,
                        error: 'Request was unable to process',
                        data : null
                    });
                }
                //const success = result.recordset[0].success;
                //const error = result.recordset[0].error;           
                //const message = result.recordset[0].response;
                if(result.recordset.length>0){
                    return res.status(200).json({
                        responseCode: 1,
                        message: 'successfully retrieved',
                        data: result.recordset,
                      });
                }
                else{
                  return res.status(200).json({
                    responseCode: 2,
                    message: 'No data found',
                    data: 'No data found',
                  });  
               }
            });
        });
    }catch(error){
        console.log('Error in 1st catch ',error);    
        return res.status(400).json({
          code:'400',
          error: "Unable to process your request",
          response: null
        }); 
    } 
}

exports.editOfflineTariffStatus = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
    const { tariff_id,status_id,source} = req.body;
 
    try{
        dbpool.then((pool)=>{
            let query = "exec UpdateTariffStatus_V1  @EmpId="+req.userdetails.user_id
            +",@TariffId='"+req.params.tariff_id
            +"',@Status='"+req.params.status_id
            +"',@Source='"+req.params.source
            +"'"; 

            console.log('queryquery',query);

            pool.request().query(query,function(err,result){
                if(err){
                    console.log('while creating pool req',err);
                    return res.status(200).json({
                        responseCode:null,
                        error: 'Request was unable to process',
                        data : null
                    });
                }
                const success = result.recordset[0].success;
                const error = result.recordset[0].error;           
                const message = result.recordset[0].response;
                if (success == 'true') {
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
                        data: result.recordset,
                    });
                }
                else {
                    return res.status(404).json({
                        responseCode: 2,
                        message: message,
                        data: result.recordset,
                    });
                }
            });
        });
    }catch(error){
        console.log('Error in 1st catch ',error);    
        return res.status(400).json({
          code:'400',
          error: "Unable to process your request",
          response: null
        }); 
    } 
}