const dbpool = require('../../Database/db');

 
exports.addOnlineTariff = async function (req,res,weekDays) {
    console.log('requestttt',req.userdetails.user_id);
    const {  source,partner_type,tag,corporate,source_geolocation,destination_geolocation,trip_type,vehicle_category,fuel,from_date,to_date,
        base_distance,base_rate_per_km,extra_rate_per_km,grt_fare,grt_waiting_time,waiting_charges,waiting_time,state_tax,toll_charges,
        other_charges,driver_allowance,night_charges,route_name,route_id,total_commission_value,
        mode,tariff_id,base_fare,commission_type_id,commission_type_name,commission_value,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;
    try {
        dbpool.then((pool) => {
            let query = "exec InsTariffDetails_V1_API  @Empid=" + req.userdetails.user_id 
            + ", @Source='"+source
            + "', @PartnerTypeId="+partner_type.id
            + ", @PartnerType='"+partner_type.name
            + "', @TagId="+tag.id
            + ", @TagName='"+tag.name
            + "', @CorporatesId="+corporate.id
            + ", @Corporates='"+corporate.name
            + "', @Sourcelocationid="+source_geolocation.id
            + ", @Sourcelocation='"+source_geolocation.name
            + "', @DestinationlocationId="+destination_geolocation.id
            + ", @Destinationlocation='"+destination_geolocation.name
            + "', @TriptypeId="+trip_type.id
            + ", @Triptype='"+trip_type.name
            + "', @VehicleCategoryId="+vehicle_category.id
            + ", @VehicleCategory='"+vehicle_category.name
            + "', @FueltypeId="+fuel.id
            + ", @Fueltype='"+fuel.fuel_type
            + "', @FromDate='"+from_date.year +"-" +from_date.month +"-" +from_date.day
            + "', @ToDate='"+to_date.year +"-" +to_date.month +"-" +to_date.day
            + "', @BaseDistance='"+base_distance
            + "', @BaseRatePerKM='"+base_rate_per_km
            + "', @ExtraFarePerKM='"+extra_rate_per_km
            + "', @GRTFare='"+grt_fare
            + "', @GRTWaitingPeriodHours='"+grt_waiting_time.id
            + "', @WaitingCharges='"+waiting_charges
            + "', @WaitingPeriodMinutes='"+waiting_time.id
            + "', @StateTax='"+state_tax
            + "', @TollCharges='"+toll_charges
            + "', @OthersCharges='"+other_charges
            + "', @DriverAllowance='"+driver_allowance
            + "', @NightCharges='"+night_charges
            + "', @TariffName='"+route_name
            + "', @RouteId="+route_id
            + ", @Weekdays='"+weekDays
            + "', @Commissionvalue='"+total_commission_value
            + "', @Mode='"+mode
            + "', @TariffId="+tariff_id
            + ", @BaseFare='"+base_fare
            + "', @commissiontypeid="+commission_type_id
            + ", @Commissiontypename='"+commission_type_name
            + "', @CommissionBaseValue='"+commission_value
            
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

exports.getOnlineTariffdetails = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
    const { corporate,source_geolocation,destination_geolocation,trip_type,
        vehicle_category,fuel,from_date,to_date} = req.body;
    try{
        dbpool.then((pool)=>{
            let query = "exec GetTariffDetails_V3_API  @EmpId="+req.userdetails.user_id
            +",@Corporateid="+corporate.id
            +",@Startlocationid="+source_geolocation.id
            +",@endlocationid="+destination_geolocation.id
            +",@Triptypeid="+trip_type.id
            +",@VehicleCategoryid="+vehicle_category.id
            +",@FueltypeId="+fuel.id
            +",@FromDate='"+from_date.year +"-" +from_date.month +"-" +from_date.day
            +"',@todate='"+to_date.year +"-" +to_date.month +"-" +to_date.day
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
                        message: 'success retrieved',
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

exports.viewOnlineTariffdetails = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
    const { year,month,source_geolocation,destination_geolocation,status} = req.body;

    source_geolocation_id = ( req.body.source_geolocation == null?'0':req.body.source_geolocation.id);
    destination_geolocation_id = ( req.body.destination_geolocation == null?'0':req.body.destination_geolocation.id);

    try{
        dbpool.then((pool)=>{
            let query = "exec Get_TariffFODetails_V1  @empid="+req.userdetails.user_id
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

exports.editOnlineTariffStatus = async function (req, res) {
      
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

exports.getOnlineTariffData = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
      
    try{
        dbpool.then((pool)=>{
            let query = "exec Get_OnlineTariff_Data_V1  @EmpId="+req.userdetails.user_id
            +",@TariffId='"+req.params.tariff_id
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
                console.log('result',result);
                if (success == 'true') {
                    return res.status(200).json({
                        responseCode: 1,
                        message: 'successfully retrieved',
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