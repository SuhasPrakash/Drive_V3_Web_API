const dbpool = require('../Database/db');
  
exports.InsDriverDetails = async function (req,res) {
    //console.log('requestttt',req.body);
    const {name,mobile_number,alternate_mobile_number,dob,gender,native_place,police_station,pcc_copy,
        tnc,driver_photo,blood_group,id_proof_copy_back,id_proof_copy_front,
        id_proof_number,id_proof_type,license_copy_back,license_copy_front,
        license_expiration_date,license_number,languages,education} = req.body;
    try {

        
   console.log('native_place',native_place);

   var native_place_name='',languages_details='',education_details='',blood_group_details='';
   var languages_ids='',education_ids='',blood_group_ids=''

   native_place_name = ( req.body.native_place == null?'NA':req.body.native_place);
   //languages_details = ( req.body.languages == null?'NA':req.body.languages.name);
   education_details = ( req.body.education == null?'NA':req.body.education.name);
   blood_group_details = ( req.body.blood_group == null?'NA':req.body.blood_group.name);
   //languages_ids = ( req.body.languages == null?'0':req.body.languages.id);
   education_ids = ( req.body.education == null?'0':req.body.education.id);
   blood_group_ids = ( req.body.blood_group == null?'0':req.body.blood_group.id);

   console.log('native_place_name',native_place_name,education_details,blood_group_details,education_ids,blood_group_ids)


   var lang_ids_Array=[]
    var lang_ids=''
    var lang_names_Array=[]
    var lang_names=''

  if(req.body.languages == null){
    lang_names='NA'
    lang_ids='0'
    console.log('if codition')
  }
  else{  
    for(var i = 0; i < languages.length;i++)
    {
        lang_ids_Array.push(languages[i].id)
        console.log('lang_ids_Arrayfor loop',lang_ids_Array);
    }  
    lang_ids =lang_ids_Array.toString();
    console.log('langid',lang_ids);

   for(var i = 0; i < languages.length;i++)
   {
       lang_names_Array.push(languages[i].name)
       console.log('lang_ids_Arrayfor loop',lang_names_Array);
   }  
   lang_names =lang_names_Array.toString();
   console.log('langid',lang_names);
  }
   

        dbpool.then((pool) => {
            let query = "exec insdriverdetails  @name='" + name 
            +"',@mobile_number='" + mobile_number 
            +"',@alternate_mobile_number='" + alternate_mobile_number 
            +"',@DOB='" +dob.year +"-" +dob.month +"-" +dob.day 
            +"',@gender='" + gender 
            +"',@native_place='" + native_place_name 
            +"',@police_station='" + police_station 
            +"',@pcc_copy='" + pcc_copy 
            +"',@tnc='" + tnc 
            +"',@driver_photo='" + driver_photo 
            +"',@blood_group_id='" + blood_group_ids
            +"',@blood_group_name='" + blood_group_details
            +"',@id_proof_copy_back='" + id_proof_copy_back 
            +"',@id_proof_copy_front='" + id_proof_copy_front 
            +"',@id_proof_number='" + id_proof_number 
            +"',@id_proof_type_id='" + id_proof_type.id 
            +"',@id_proof_type_name='" + id_proof_type.name 
            +"',@license_copy_back='" + license_copy_back 
            +"',@license_copy_front='" + license_copy_front 
           // +"',@license_expiration_date='" + license_expiration_date.year +"-" +license_expiration_date.month +"-" +license_expiration_date.day
            +"',@license_expiration_date='" + license_expiration_date
            +"',@license_number='" + license_number 
            +"',@languages_id='" + lang_ids 
            +"',@languages_name='" + lang_names 
            +"',@education_id='" + education_ids
            +"',@education_name='" + education_details
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
                console.log('result:',result);
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

exports.getDriverListViewDetails=async function (req, res) {
   // const{emp_id}=req.params;

    try{
        dbpool.then((pool)=>{
            let query = "exec get_driverListViewDetails  @emp_id='"+req.userdetails.user_id+"'"; 
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
 
exports.getDriversMapView = async function (req, res) {
      
    const {emp_id} =req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec GetDriver_MapList_API  @emp_id='"+emp_id+"'"; 
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

exports.GetDriverProfileDetails=async function (req, res) {
    const{driver_emp_id}=req.params;

    try{
        dbpool.then((pool)=>{
            let query = "exec get_driverProfileDetails  @driver_emp_id='"+driver_emp_id+"'"; 
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







