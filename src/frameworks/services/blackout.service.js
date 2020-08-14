const dbpool = require('../Database/db');

exports.insBlackoutDays = async function (req,res,blackoutDays) {
    console.log('requestttt',req.body);
    console.log('userdetails',req.userdetails.user_id);
    const { vehicle_category,from_date,to_date,from_time,to_time,vehicle,mode,id,
        all_chk,sunday_chk,monday_chk,tuesday_chk,wednesday_chk,thursday_chk,friday_chk,saturday_chk} = req.body;
    try {
        dbpool.then((pool) => {
            let query = "exec InsBlackoutDays_API  @EmpId='" + req.userdetails.user_id 
            + "', @VehicleCategoryId='"+vehicle_category.id
            + "', @VehicleCategoryName='"+vehicle_category.name
            + "', @FromDate='" +from_date.year +"-" +from_date.month +"-" +from_date.day +"', @ToDate='" +to_date.year +"-" +to_date.month +"-" +to_date.day 
            + "', @FromTime='"+from_time+ "', @ToTime='"+to_time
            + "', @Blackoutdays='"+blackoutDays+ "', @FuelTypeId='', @FuelType='', @VehicleId='"+vehicle.id
            + "', @VehicleNo='"+vehicle.vehicle_number+ "', @Source='Web_API', @Mode='"+mode+"', @Id='"+id+"'";
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

exports.getBlackoutDays = async function (req,res) {
    console.log('requestttt',req.userdetails.user_id);
    
    try {
        dbpool.then((pool) => {
            let query = "exec GetBlackoutDays_API  @emp_id=" + req.userdetails.user_id+ "";
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
                //const message = result.recordset[0].response;
                //const success = result.recordset[0].success;
                if(result.recordset.length>0){
                    return res.status(200).json({
                        responseCode: 1,
                        message: 'success',
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

    } catch (error) {
        console.log('Error in 1st catch ', error);
        return res.status(400).json({
            responseCode: '400',
            error: "Unable to process your request",
            response: error
        });
    } 
}

exports.deleteBlackoutDays = async function (req,res,blackoutDays) {
    console.log('requestttt',req.body);
    const { blackout_id } = req.body;
    try {
        dbpool.then((pool) => {
            let query = "exec DeleteBlackoutDays_API  @emp_id=" + req.userdetails.user_id+ ",@blackout_id="+blackout_id+"";
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

exports.editBlackoutDays = async function (req,res) {
    console.log('requestttt',req.userdetails.user_id);
    const { blackout_id } = req.body;
    
    try {
        dbpool.then((pool) => {
            let query = "exec GetBlackoutDaysData_API  @emp_id=" + req.userdetails.user_id+ ",@blackout_id=" + blackout_id+ "";
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
                //const message = result.recordset[0].response;
                //const success = result.recordset[0].success;
                if(result.recordset.length>0){
                    return res.status(200).json({
                        responseCode: 1,
                        message: 'success',
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

    } catch (error) {
        console.log('Error in 1st catch ', error);
        return res.status(400).json({
            responseCode: '400',
            error: "Unable to process your request",
            response: error
        });
    } 
}