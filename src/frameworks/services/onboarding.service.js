//var User = require('../models/user.model')

const dbpool = require('../Database/db');

exports.insFoDetails = async function (req, res) {
     
    console.log('requestttt',req.body);
    const {Name,DOB,Gender,CityOperations,Email,TabId,ProgressStatus} = req.body; 
    try {
        dbpool.then((pool) => {
          let query =
            "exec Ins_FleetOwnerData  @Name='" + Name +"' , @DOB='" +DOB.year +"-" +DOB.month +"-" +DOB.day +"' , @Gender='" +Gender.Name +"', @CityOperations='" +CityOperations.Name +"', @CityId='" +CityOperations.id +"' , @Email='" +Email +"' ,  @TabId='" +TabId +"' , @ProgressStatus='" +ProgressStatus +"' , @mobileno='" +req.userdetails.mobileno +"', @VendorId='" +req.userdetails.VendorId +"' , @UserId='" +req.userdetails.UserId +"'";
    
          pool.request().query(query, function (err, result) {
            if (err) {
              console.log("while creating pool req", err);
              return res.status(400).json({
                responseCode: -1,
                message: "Request was unable to process",
                data: null,
              });
            }
            console.log(result.recordset);
    
            const success = result.recordset[0].success;
            const error = result.recordset[0].error;
            const message = result.recordset[0].response;
    
            if (success == "true") {
              return res.status(200).json({
                responseCode: 1,
                message: message,
                data: result.recordset,
              });
            } else {
              return res.status(200).json({
                responseCode: 2,
                message: message,
                data: result.recordset,
              });
            }
          });
        });
      } catch (error) {
        console.log("Error in 1st catch ", error);
        return res.status(400).json({
          code: "400",
          error: "Unable to process your request",
          response: null,
        });
      }
}
exports.getFOPartnerType = async function (req, res) {
     
    console.log('requestttt',req.body);
    const { VendorId,UserId,EmpId } = req.body; 
    try{
        dbpool.then((pool)=>{
            let query = "exec GetFOPartnerType  @UserId='"+UserId+"' , @VendorId='"+VendorId+"' , @EmpId='"+EmpId+"'"; 
         
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

exports.getData = async function (req, res) {
  console.log(req.params.tabId);
  const  TabId  = req.params.tabId;
  try {
    dbpool.then((pool) => {
      console.log("req.userdetails", req.userdetails.mobileno,TabId);
      let query ="exec GetFOData  @UserId='" +req.userdetails.UserId +"' , @VendorId='" +req.userdetails.VendorId +"' , @TabId='" +TabId +"' , @mobileno='" +req.userdetails.mobileno +"'";
      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: 2,
            message: "Request was unable to process",
            data:[],
          });
        }
        console.log(result.recordset.length);
        const message = result.recordset[0].response;
        const success = result.recordset[0].success;
        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: "No data found",
            data: result.recordset,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.getDocProofType = async function (req, res) {
  const { VendorId, UserId, EmpId } = req.body;
  try {
    dbpool.then((pool) => {
      let query = "exec Get_DocProofType  @UserId='" + UserId + "' , @VendorId='" + VendorId + "' , @EmpId='" + EmpId + "'";

      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: 3,
            error: "Request was unable to process",
            data: null,
          });
        }
        console.log(result.recordset);

        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;

        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: message,
            data: result.recordset,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.getRegistrationStatus = async function (req, res) {
   
  try {
    dbpool.then((pool) => {
      let query = "exec GetFORegistrationStatus  @UserId='" + req.userdetails.UserId + "' , @VendorId='" + req.userdetails.VendorId + "' , @EmpId='" + req.userdetails.Id + "' , @mobileno='" + req.userdetails.mobileno + "'";

      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: null,
            message: "Request was unable to process",
            data: null,
          });
        }
        console.log(result.recordset.length);

        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;

        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: "No data found",
            data: "No data found",
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.insFoBankDetails = async function (req, res) {
      
  const {BankName,IFSC,AccountHolderName,AccountNo,BankProoftype,TabId,Status,DocumentPath} = req.body; 
  try {
    dbpool.then((pool) => {
      let query =  "exec InsFoBankDetails  @BankName='" +  req.body.BankName +  "' , @IFSC='" +  req.body.IFSC +  "' , @AccountHolderName='" +  req.body.AccountHolderName +  "' , @AccountNo='" +  req.body.AccountNo +  "' , @BankProoftypeid='" +  req.body.BankProoftype.id +  "'           , @BankProoftype='" +  req.body.BankProoftype.Name +  "',  @TabId='" +  req.body.TabId +  "' , @Status='" +  req.body.Status +  "'  , @DocumentPath='" +  req.body.DocumentPath +  "' , @mobileno='" +  req.userdetails.mobileno +  "'";
      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: null,
            error: "Request was unable to process",
            data: null,
          });
        }
        console.log(result.recordset);
        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;
        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: message,
            data: result.recordset,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.insFoFleetDetails = async function (req, res) {
      
  const {partnertype,vehicleno1,DocumentPath1,vehicleno2,DocumentPath2,vehicleno3,DocumentPath3 } = req.body; 
  try {
    dbpool.then((pool) => {
      let query =  "exec InsFoFleetDetails  @mobileno='" +  req.userdetails.mobileno +  "', @partnertype='" +  req.body.partnertype.Name +  "' , @partnertypeid='" +  req.body.partnertype.id +  "' , @vehicleno1='" +  vehicleno1 +  "' , @DocumentPath1='" +  DocumentPath1 +  "', @vehicleno2='" +  vehicleno2 +  "' , @DocumentPath2='" +  DocumentPath2 +  "', @vehicleno3='" +  vehicleno3 +  "', @DocumentPath3='" +  DocumentPath3 +  "'";
      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: null,
            error: "Request was unable to process",
            data: null,
          });
        }
        console.log(result.recordset);
        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;
        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: message,
            data: result.recordset,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.uploadFoFleetDocuments = async function (req, res) {
      
  const { PhotoFilePath, PhotoBackSideFilePath, pannumber, PanFilePath, address, AddressProofFilePath,addressprooftype } = req.body; 
  try {
    dbpool.then((pool) => {
      let query =  "exec UploadFoFleetDocuments @mobileno='" +  req.userdetails.mobileno +  "',@PhotoFilePath='" +  PhotoFilePath +  "' , @PhotoBackSideFilePath='" +  PhotoBackSideFilePath +  "' , @PanNo='" +  pannumber +  "', @PanFilePath ='" +  PanFilePath +  "', @Address='" +  address +  "' , @AddressProofFilePath='" +  AddressProofFilePath +  "', @AddressProofType='" +  req.body.addressprooftype.Name +  "' , @AddressProofTypeId='" +  req.body.addressprooftype.id +  "'";
      console.log('queryquery',query);
      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: 3,
            error: "Request was unable to process",
            data: null,
          });
        }
        console.log(result.recordset);
        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;
        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: message,
            data: result.recordset,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.uploadFoFleetProprietorDocuments = async function (req, res) {
      
  const { GSTNo, ProgressStatus, TabId, UploadPhotographfile, mobileno, pannumber, partnertypeid, proprietorprooftype,
    uploadGSTcopyfile, uploadpancopyfile, uploadproprietorprooffile, } = req.body;
    try {
      dbpool.then((pool) => {
        let query =
          "exec UploadFoFleetProprotorDocuments @GSTNo='" +
          GSTNo +
          "', @ProgressStatus='" +
          ProgressStatus +
          "' , @TabId='" +
          TabId +
          "' , @UploadPhotograghfile='" +
          UploadPhotographfile +
          "', @mobileno ='" +
          req.userdetails.mobileno +
          "' , @pannumber='" +
          pannumber +
          "', @partnertypeid='" +
          partnertypeid +
          "', @proprieterprooftype='" +
          req.body.proprietorprooftype.Name +
          "', @proprieterprooftypeId='" +
          req.body.proprietorprooftype.id +
          "', @uploadGSTcopyfile ='" +
          uploadGSTcopyfile +
          "' , @uploadpancopyfile ='" +
          uploadpancopyfile +
          "', @uploadproprieterprooffile ='" +
          uploadproprietorprooffile +
          "'";
        pool.request().query(query, function (err, result) {
          if (err) {
            console.log("while creating pool req", err);
            return res.status(200).json({
              responseCode: 3,
              error: "Request was unable to process",
              data: null,
            });
          }
  
          const success = result.recordset[0].success;
          const error = result.recordset[0].error;
          const message = result.recordset[0].response;
          if (success == "true") {
            return res.status(200).json({
              responseCode: 1,
              message: message,
              data: result.recordset,
            });
          } else {
            return res.status(200).json({
              responseCode: 2,
              message: message,
              data: result.recordset,
            });
          }
        });
      });
    } catch (error) {
      console.log("Error in 1st catch ", error);
      return res.status(400).json({
        code: "400",
        error: "Unable to process your request",
        response: null,
      });
    }
}

exports.uploadFoFleetCompanyDocuments = async function (req, res) {
      
  const { CINNumber, ProgressStatus, TabId, UploadPhotographfile, mobileno, pannumber,
    partnertypeid, uploadincorporationcopyfile, uploadpancopyfile,} = req.body;

  try {
    dbpool.then((pool) => {
      let query =
        "exec UploadFoFleetCompanyDocuments @CINNumber='" +
        CINNumber +
        "', @ProgressStatus='" +
        ProgressStatus +
        "' , @TabId='" +
        TabId +
        "' , @UploadPhotograghfile='" +
        UploadPhotographfile +
        "', @mobileno ='" +
        req.userdetails.mobileno +
        "' , @pannumber='" +
        pannumber +
        "', @partnertypeid='" +
        partnertypeid +
        "', @uploadincorporationcopyfile='" +
        uploadincorporationcopyfile +
        "', @uploadpancopyfile='" +
        uploadpancopyfile +
        "'";
      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(200).json({
            responseCode: 3,
            error: "Request was unable to process",
            data: null,
          });
        }

        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;
        if (success == "true") {
          return res.status(200).json({
            responseCode: 1,
            message: message,
            data: result.recordset,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: message,
            data: result.recordset,
          });
        }
      });
    });
  } catch (error) {
    console.log("Error in 1st catch ", error);
    return res.status(400).json({
      code: "400",
      error: "Unable to process your request",
      response: null,
    });
  }
}

exports.UploadFoFleetPartnershipDocuments = async function (req, res) {
      
  // const { ProgressStatus, TabId, UploadPhotograghfile, mobileno, pannumber, 
  //   partnertypeid, uploadincorporationcopyfile, uploadpancopyfile } = req.body;
    const { ProgressStatus, TabId, UploadPhotographfile, mobileno, pannumber, 
      partnertypeid, uploadpartnershipcopyfile, uploadpancopyfile } = req.body;

    try {
      dbpool.then((pool) => {
        let query =
          "exec UploadFoFleetPartnershipDocuments @ProgressStatus='" +
          ProgressStatus +
          "' , @TabId='" +
          TabId +
          "' , @UploadPhotograghfile='" +
          UploadPhotographfile +
          "', @mobileno ='" +
          req.userdetails.mobileno +
          "' , @pannumber='" +
          pannumber +
          "', @partnertypeid='" +
          partnertypeid +
          "', @uploadincorporationcopyfile='" +
          uploadpartnershipcopyfile +
          "', @uploadpancopyfile='" +
          uploadpancopyfile +
          "'";
        pool.request().query(query, function (err, result) {
          if (err) {
            console.log("while creating pool req", err);
            return res.status(200).json({
              responseCode: 3,
              error: "Request was unable to process",
              data: null,
            });
          }
  
          const success = result.recordset[0].success;
          const error = result.recordset[0].error;
          const message = result.recordset[0].response;
          if (success == "true") {
            return res.status(200).json({
              responseCode: 1,
              message: message,
              data: result.recordset,
            });
          } else {
            return res.status(200).json({
              responseCode: 2,
              message: message,
              data: result.recordset,
            });
          }
        });
      });
    } catch (error) {
      console.log("Error in 1st catch ", error);
      return res.status(400).json({
        code: "400",
        error: "Unable to process your request",
        response: null,
      });
    }
}

exports.insLegalAcceptance = async function (req, res) {
     
  console.log('requestttt',req.body);
  const {legal_status} = req.body; 
  try {
      dbpool.then((pool) => {
        let query =
          "exec Ins_FO_Legal_Acceptance  @Legal_Status='" + legal_status +"' , @mobileno='" +req.userdetails.mobileno +"', @UserId='" +req.userdetails.UserId +"'";
  
        pool.request().query(query, function (err, result) {
          if (err) {
            console.log("while creating pool req", err);
            return res.status(400).json({
              responseCode: -1,
              message: "Request was unable to process",
              data: null,
            });
          }
          console.log(result.recordset);
  
          const success = result.recordset[0].success;
          const error = result.recordset[0].error;
          const message = result.recordset[0].response;
  
          if (success == "true") {
            return res.status(200).json({
              responseCode: 1,
              message: message,
              data: result.recordset,
            });
          } else {
            return res.status(200).json({
              responseCode: 2,
              message: message,
              data: result.recordset,
            });
          }
        });
      });
    } catch (error) {
      console.log("Error in 1st catch ", error);
      return res.status(400).json({
        code: "400",
        error: "Unable to process your request",
        response: null,
      });
    }
}