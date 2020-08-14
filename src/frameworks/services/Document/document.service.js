const dbpool = require('../../Database/db');


// exports.uploadDocument = async function (req,res,weekDays) {
//     console.log('requestttt',req.body);
     
//     try {
         

//     } catch (error) {
//         console.log('Error in 1st catch ', error);
//         return res.status(400).json({
//             responseCode: '400',
//             error: "Unable to process your request",
//             response: error
//         });
//     } 
// }


exports.uploadDocument = async function (req, res) {

        const file = req.file;
        //console.log("Upload", file.filename);
        console.log("file content", req.body.items);
      
    //console.log('requestttt',req.userdetails.user_id);
    try{
        dbpool.then((pool)=>{
            let query = "exec GetThirdpartyTripType_API  @emp_id='"+1+"'"; 
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