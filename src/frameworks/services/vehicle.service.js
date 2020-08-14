const dbpool = require('../Database/db');


exports.getVehicleCategory = async function (req,res) {
    console.log('requestttt',req.userdetails.user_id);
    
    
    //const { emp_id } = req.body; 
    try {
        dbpool.then((pool) => {
            let query = "exec LoadVehicleCategory_API  @EmpId='" + req.userdetails.user_id + "'";
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
                        message: 'Success',
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

exports.getVehicleBasedOnCategory = async function (req,res) {
    console.log('requestttt',req.body);
    const { vehicle_category } = req.body;
    try {
        dbpool.then((pool) => {
            let query = "exec GetVehicleBasedOnCategory_API  @EmpId='" + req.userdetails.user_id + "', @CategoryId='"+vehicle_category.id+"'";
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
                        message: 'Success',
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

exports.getVehicleInventory = async function (req,res) {
    console.log('requestttt',req.body);
    const { source_geolocation,destination_geolocation,trip_type,vehicle_category,date } = req.body;

    
    source_geolocation_id = ( req.body.source_geolocation == null?'0':req.body.source_geolocation.id);
    destination_geolocation_id = ( req.body.destination_geolocation == null?'0':req.body.destination_geolocation.id);
    trip_type_id = ( req.body.trip_type == null?'0':req.body.trip_type.id);
    vehicle_category_id = ( req.body.vehicle_category == null?'0':req.body.vehicle_category.id);


    try {
        dbpool.then((pool) => {
            let query = "exec GetVehicleInventoryData_API  @EmpId='" + req.userdetails.user_id 
            + "', @SourceRouteId='"+source_geolocation_id
            + "', @DestinationRouteId='"+destination_geolocation_id
            + "', @TriptypeId='"+trip_type_id
            + "', @VehicleCategoryId='"+vehicle_category_id
            + "', @Date='" +date.year +"-" +date.month +"-" +date.day
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
                //const message = result.recordset[0].response;
                //const success = result.recordset[0].success;
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

    } catch (error) {
        console.log('Error in 1st catch ', error);
        return res.status(400).json({
            responseCode: '400',
            error: "Unable to process your request",
            response: error
        });
    } 
}

