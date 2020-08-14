const Joi = require("@hapi/joi");
const DriverService = require('../frameworks/services/driver.service')


exports.InsDriverDetails =  function (req, res) {
    console.log('Testing...')
   
    const {name,mobile_number,alternate_mobile_number,dob,gender,native_place,police_station,pcc_copy,
        tnc,driver_photo,blood_group,id_proof_copy_back,id_proof_copy_front,
        id_proof_number,id_proof_type,license_copy_back,license_copy_front,
        license_expiration_date,license_number,languages,education} = req.body;

    
    console.log('queryyyyyTruey', req.body);
    const insDriverDetailsSchema = Joi.object({
        name: Joi.string().required(),
        mobile_number: Joi.number().min(1000000000).message("invalid mobileno").max(9999999999).message("invalid mobileno").required(),
        alternate_mobile_number: Joi.number().min(1000000000).message("invalid mobileno").max(9999999999).message("invalid mobileno").required(),      
        dob:Joi.object({
            year: Joi.number().positive().required(),
            month: Joi.number().positive().required(),
            day: Joi.number().positive().required()
        }).unknown(true).required(),
        gender: Joi.string().required(),
        native_place: Joi.string().optional().allow(null),
        police_station: Joi.string().required(),
        pcc_copy: Joi.string().required(),
        tnc: Joi.boolean().required(),
        driver_photo: Joi.string().required(),       
        blood_group:Joi.object({
            id:Joi.number().positive().required(),
            name:Joi.string().required()
        }).unknown(true).optional().allow(null),
        id_proof_copy_back: Joi.string().required(),
        id_proof_copy_front: Joi.string().required(),
        id_proof_number: Joi.string().required(),       
        id_proof_type:Joi.object({
            id:Joi.number().positive().required(),
            name:Joi.string().required()
        }).unknown(true).required(),
        license_copy_back: Joi.string().required(),
        license_copy_front: Joi.string().required(),   
        license_expiration_date:Joi.string().required(),    
        license_number: Joi.string().alphanum().required(),      
       
        languages:Joi.array().items(Joi.object({
            id:Joi.number().positive().required(),
            name:Joi.string().required()
        })).optional().allow(null), 

       education:Joi.object({
            id:Joi.number().positive().required(),
            name:Joi.string().required()
       }).unknown(true).optional().allow(null),     
    }).unknown(true);


       // if(typeof req.params.native_place == "null"){
       //     native_place='NA';
       //  }
       //  else{
       //     native_place=req.params.native_place
       //  }

console.log('native_place',native_place);




   // tag: Joi.object().keys({id:Joi.number().required(),name:Joi.string().required()}).required().unknown(true),
   // console.log('insDriverDetailsSchema: ',insDriverDetailsSchema)
   // console.log(languages,' languageslanguages'); 
   

    var validate_result = insDriverDetailsSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }


    // // var lang_ids_Array=[]
    // // var lang_ids=''
    // // for(var i = 0; i < languages.length;i++)
    // // {
    // //     lang_ids_Array.push(languages[i].id)
    // //     console.log('lang_ids_Arrayfor loop',lang_ids_Array);
    // // }  
    // // lang_ids =lang_ids_Array.toString();
    // // console.log('langid',lang_ids);


    // // var lang_names_Array=[]
    // // var lang_names=''
    // // for(var i = 0; i < languages.length;i++)
    // // {
    // //     lang_names_Array.push(languages[i].name)
    // //     console.log('lang_ids_Arrayfor loop',lang_names_Array);
    // // }  
    // // lang_names =lang_names_Array.toString();
    // // console.log('langid',lang_names);


    try {
        var users =  DriverService.InsDriverDetails(req,res)
        //var users =  DriverService.insDriverDetails(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.getDriverListViewDetails=function(req,res){

    //const{emp_id}=req.params;

    const getDriverListViewDetails = Joi.object({
        //emp_id: Joi.number().positive().required()  
    }).unknown(true);

    var validate_result = getDriverListViewDetails.validate(req.params);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  DriverService.getDriverListViewDetails(req,res)
      
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }

}

exports.GetDriversMapView =  function (req, res) {
    console.log('Testing...')
    const { emp_id } = req.body;
    console.log('queryyyyyTruey', req.body);
    const getDriversMapViewSchema = Joi.object({
        emp_id: Joi.required()
    }).unknown(true);
    var validate_result = getDriversMapViewSchema.validate(req.body);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  DriverService.getDriversMapView(req,res)
        //return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.GetDriverProfileDetails=function(req,res){

    const{driver_emp_id}=req.params;

    const getDriverProfileDetails = Joi.object({
        driver_emp_id: Joi.number().positive().required()  
    }).unknown(true);

    var validate_result = getDriverProfileDetails.validate(req.params);
    if (validate_result.error) {
        console.log('Error in Validation', validate_result);
        return res.status(200).json({
            responseCode: null,
            error: validate_result.error.details[0].message,
            data: null
        });
    }

    try {
        var users =  DriverService.GetDriverProfileDetails(req,res)
      
    } catch (e) {
        console.log('errorrrr',e)
        return res.status(400).json({ status: 400, message: e.message });
    }



}





