const dbpool = require('../Database/db');

exports.getThirdpartyTripType = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec GetThirdpartyTripType_API  @emp_id='"+req.userdetails.user_id+"'"; 
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
               // const message = result.recordset[0].response;
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
    }catch(error){
        console.log('Error in 1st catch ',error);    
        return res.status(400).json({
          code:'400',
          error: "Unable to process your request",
          response: null
        }); 
    } 
}
exports.getFuelType = async function (req, res) {
      
    console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec LoadFuelType_API  @emp_id='"+req.userdetails.user_id+"'"; 
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
    }catch(error){
        console.log('Error in 1st catch ',error);    
        return res.status(400).json({
          code:'400',
          error: "Unable to process your request",
          response: null
        }); 
    } 
}

exports.getRouteBasedFuelType = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec LoadFuelForRouteBasedTariff_API  @emp_id='"+req.userdetails.user_id+"'"; 
            pool.request().query(query,function(err,result){
                if(err){
                    console.log('while creating pool req',err);
                    return res.status(200).json({
                        responseCode:null,
                        error: 'Request was unable to process',
                        data : null
                    });
                }
               // const success = result.recordset[0].success;
                //const error = result.recordset[0].error;           
                const message = result.recordset[0].response;
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
    }catch(error){
        console.log('Error in 1st catch ',error);    
        return res.status(400).json({
          code:'400',
          error: "Unable to process your request",
          response: null
        }); 
    } 
}

exports.getTagBasedOnVendor = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec LoadTag_API  @emp_id='"+req.userdetails.user_id+"'"; 
            pool.request().query(query,function(err,result){
                if(err){
                    console.log('while creating pool req',err);
                    return res.status(200).json({
                        responseCode:null,
                        error: 'Request was unable to process',
                        data : null
                    });
                }
               // const success = result.recordset[0].success;
                //const error = result.recordset[0].error;           
                const message = result.recordset[0].response;
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
    }catch(error){
        console.log('Error in 1st catch ',error);    
        return res.status(400).json({
          code:'400',
          error: "Unable to process your request",
          response: null
        }); 
    } 
}

exports.addTagBasedOnVendor = async function (req,res,weekDays) {
    console.log('requestttt',req.userdetails.user_id);
    const {tag_name} = req.body;
    try {
        dbpool.then((pool) => {
            
            let query = "exec InsTagMaster_API  @emp_id="+req.userdetails.user_id+",@tag_name='"+tag_name+"'";
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