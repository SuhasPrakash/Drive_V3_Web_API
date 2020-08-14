const dbpool = require('../Database/db');

exports.getFOLocation = async function (req, res) {
      
    const {VendorId,UserId,CountryId} =req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec GetFOLocation  @UserId='"+0+"' , @VendorId='"+0+"' , @CountryId='"+0+"'"; 
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
                if(result.recordset.length>0){
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
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

exports.getAllGeolocation = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    //const {emp_id} =req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec GetAllGeolocations_API  @emp_id='"+req.userdetails.user_id+"' , @geoLocation_id='"+0+"' , @status='source'"; 
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
                if(result.recordset.length>0){
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
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

exports.getDestinationBasedOnSource = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    const {source_geolocation} =req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec GetAllGeolocations_API  @emp_id='"+req.userdetails.user_id+"' , @geoLocation_id='"+source_geolocation.id+"' , @status='Destination'"; 
            console.log('Full-query=>>',query);
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
                if(result.recordset.length>0){
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
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

exports.getRouteBasedSourceLocation = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec GetRouteBasedSourceLocation  @emp_id='"+req.userdetails.user_id+"'"; 
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

exports.getRouteBasedDestinationLocation = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    const {source_geolocation}=req.body
    try{
        dbpool.then((pool)=>{
            let query = "exec GetRouteBasedDestinationLocation  @emp_id='"+req.userdetails.user_id+"',@source_geolocation_id='"+source_geolocation.id+"'"; 
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

exports.getCountry = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec LoadCountry_API  @emp_id="+req.userdetails.user_id+""; 
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

exports.getStateBasedOnCountry = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    const {country}=req.body
    try{
        dbpool.then((pool)=>{
            let query = "exec LoadState_API @emp_id="+req.userdetails.user_id+",@country_id="+country.id+""; 
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

exports.getCityBasedOnState = async function (req, res) {
    console.log('requestttt',req.userdetails.user_id);
    const {country,state}=req.body
    try{
        dbpool.then((pool)=>{
            let query = "exec LoadCity_API  @emp_id="+req.userdetails.user_id+",@country_id="+country.id+",@state_id="+state.id+""; 
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
