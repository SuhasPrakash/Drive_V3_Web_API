//var User = require('../models/user.model')

const dbpool = require('../Database/db');


exports.getOTP = async function (req,res) {
    console.log('requestttt',req.body);
    const { mobileno } = req.body; 
    try {
        dbpool.then((pool) => {
            let query = "exec GetOTP  @mobileno='" + mobileno + "'";
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

exports.register = async function (req,res) {
     
    console.log('requestttt',req.body);
    const { mobileno } = req.body; 
    try {
        dbpool.then((pool) => {
            let query = "exec Ins_NewSelfFoRegistration    @mobileno='"+mobileno+"'"; 
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

exports.verifyOTP = async function (req,res) {
     
    console.log('requestttt',req.body);
    const {mobileno,otp} = req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec get_VerifyOTP @mobileno='"+mobileno+"', @otp='"+otp+"'"; 
            console.log('VerifyOTP working',query); 
            pool.request().query(query,function(err,result){
                if(err){
                    console.log('while creating pool req',err);
                    return res.status(200).json({
                        responseCode:null,
                        error: 'Request was unable to process',
                        data : null

                    });
                }   
                 
                const data = result.recordset[0].data;
                const message = result.recordset[0].response;
                const success = result.recordset[0].success;
                if(success=='true'){
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
                        data: result,
                      });
                }
                if (result.recordset.length > 0) {
                    const token = jwt.sign(
                        {
                            loginDetails: result.recordset[0],
                            "exptime": (new Date().getTime())
                        },
                        configParams.secretKey,
                        { expiresIn: "5h" });
                    console.log('Token', token)

                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
                        data: result.recordset,
                        token: token,
                    });
                }

                else{
                  return res.status(200).json({
                    responseCode: 2,
                    message: message,
                    data: result,
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

exports.getLogin = async function (req,res) {
     
    console.log('requestttt',req.body);
    const { otp,mobileno } = req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec GetFOLogin  @OTP='"+otp+"'  , @mobileno='"+mobileno+"'"; 
            pool.request().query(query,function(err,result){
                if(err){
                    console.log('while creating pool req',err);
                    return res.status(200).json({
                        responseCode:null,
                        error: 'Request was unable to process',
                        data : null
                    });
                }
                console.log(result.recordset.length);
                const success = result.recordset[0].success;
                const error = result.recordset[0].error;           
                const message = result.recordset[0].response;
                const TabId = result.recordset[0].TabId;
                console.log('result[0]',result.recordset[0]);
                if(success=='true'){
                       const token=jwt.sign(
                         {
                             userdetails:result.recordset[0],
                        "exptime": (new Date().getTime())
                         }, 
                         configParams.secretKey,
                         { expiresIn:"5h"   });
                         console.log('Token',token)
                    return res.status(200).json({
                        responseCode: 1,
                        message: message,
                        data: result.recordset,
                        TabId: TabId,
                        token: token
                      });
                }
                else{
                  return res.status(200).json({
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