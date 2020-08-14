const dbpool = require('../Database/db');

exports.getAssignedCorporates = async function (req,res) {
    console.log('requestttt',req.userdetails.user_id);
     
    try {
        dbpool.then((pool) => {
            let query = "exec GetAssignedCorporates_API  @emp_id='" + req.userdetails.user_id + "'";
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

exports.getAssignedDG_Corporates = async function (req,res) {
    console.log('requestttt',req.userdetails.user_id);
    //const { emp_id } = req.body; 
    try {
        dbpool.then((pool) => {
            let query = "exec GetAssigned_DG_Corporates  @emp_id='" + req.userdetails.user_id + "'";
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