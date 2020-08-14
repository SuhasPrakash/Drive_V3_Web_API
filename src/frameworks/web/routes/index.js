const express = require('express');
const register = require('./On-Boarding/registration');
const onboarding = require('./On-Boarding/onboarding');
const geolocation = require('./Location/geolocation');
const vehicle = require('./Vehicle/vehicle');
const blackout = require('./Blackout/blackout');
const utility = require('./Utility/utility');
const corporate = require('./Corporate/corporate');
const driver =require('./Driver/driver');
const offlineTariff =require('./Tariff/offlineTariff');
const onlineTariff =require('./Tariff/onlineTariff')
const documents =require('./Documents/documents');

 
const bodyParser = require("body-parser");
const dbpool = require('../../Database/db');
var path = require("path");
var multer = require("multer");
const fs = require('fs');
const morgon = require("morgan");
 
const verifyToken = require('../../../auth/VerifyToken');
//const verifyToken = require('../../../../src/public');

const routes = express.Router();


routes.use(bodyParser.json());

const cors = require("cors");
routes.use(cors());
routes.use(bodyParser.urlencoded({ extended: false }));

routes.use(morgon("combined"));
routes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
console.log("index.js");

routes.use('/public', express.static('public'))

//routes.use("/public", express.static(__dirname + "/public"));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

var upload = multer({ storage: storage });


try{
// routing starts here & only for login direct controller.

    const loginController = require("./login");
    const registerRouter =  register
    const onboardingRouter = onboarding
    const gelocationRouter = geolocation
    const vehicleRouter = vehicle
    const blackoutRouter = blackout
    const utilityRouter = utility
    const corporateRouter =corporate
    const driverRouter = driver
    const onlineTariffRouter = onlineTariff
    const offlineTariffRouter =offlineTariff
    const documentsRouter = documents

    routes.use("/user", loginController);
    
    routes.use('/register', registerRouter);
    routes.use('/onboarding', onboardingRouter);
    routes.use('/geolocation', gelocationRouter);
    routes.use('/vehicle', vehicleRouter);
    routes.use('/blackout', blackoutRouter);
    routes.use('/utility', utilityRouter);
    routes.use('/corporate',corporateRouter);
    routes.use('/driver',driverRouter);
    routes.use('/online-tariff',onlineTariffRouter);
    routes.use('/offline-tariff',offlineTariffRouter);
    routes.use('/document_new',documentsRouter);




      routes.post("/documents/upload", upload.single("file"),verifyToken, function (
        req,
        res,
        next
      ) {
        const file = req.file;
        console.log("Upload", file.filename);
        console.log("file content", req.body.items);
        const reqData = JSON.parse(req.body.items);
        if (!file) {
          const error = new Error("Please Upload File");
          error.httpStatusCode = 404;
          return res.status(404).json({
            responseCode: 2,
            message: "File to Upload File",
            data: {
              file: file,
              filename: imagePath,
            },
          });
        }
        console.log('req.file.path',req.file.path);
        var imagePath = req.file.path.replace("public\\", "");
        console.log("imagePath", imagePath); 
        console.log(req.body);
        const { documentType, TabId } = JSON.parse(req.body.items);
        try {
          console.log("test");
          console.log(documentType);
          console.log(JSON.parse(req.body.items).documentType);
          dbpool.then((pool) => {
            let query =
              "exec Ins_FO_DocUpload_V2   @Prooftype='" +
              documentType +
              "', @TabId='" +
              TabId +
              "', @DocumentPath='" +
              imagePath +
              "', @mobileno='" +
              req.userdetails.mobileno +
              "'";
            pool.request().query(query, function (err, result) {
              if (err) {
                console.log("while creating pool req", err);
                return res.status(400).json({
                  responseCode:2,
                  message: "Request was unable to process",
                  data: [],
                });
              }
              const success = result.recordset[0].success;
              const message = result.recordset[0].response;
              if (result.recordset.length > 0) {
                return res.status(200).json({
                  responseCode: 1,
                  message: 'Uploaded Succesfully',
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
      });
      routes.post("/documents/delete",verifyToken, function (req, res) {
        const { imgPath,doctype } = req.body;
        console.log(imgPath,doctype);
        try {
          dbpool.then((pool) => {
            let query =
              "exec deleteFOData  @UserId='" +
              req.userdetails.UserId  +
              "' , @VendorId='" +
              req.userdetails.VendorId +
              "' , @TabId='" +
              req.userdetails.TabId +
              "' , @mobileno='" +
              req.userdetails.mobileno  +
              "', @imgPath='" +
              imgPath +
              "'";
    
            console.log(query);
            pool.request().query(query, function (err, result) {
              if (err) {
                console.log("while creating pool req", err);
                return res.status(200).json({
                  responseCode: 2,
                  error: "Request was unable to process",
                  data: null,
                });
              }
             // console.log(imgPath,result);
              const message = result.recordset[0].response;
              if (result.recordset.length > 0) {
                try {
                  console.log("File removed..***********");
                  fs.unlinkSync(imgPath);
                  //file removed
                } catch (err) {
                  console.error(err);
                }
                return res.status(200).json({
                  responseCode: 1,
                  message: 'Removed succesfully',
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
      });

      ///This is to upload documents to server only and return path
      routes.post("/documents_new/upload", upload.single("file"), function (req, res,next) {
        const file = req.file;
        console.log("Upload", file.filename);
        if (!file) {
          const error = new Error("Please Upload File");
          error.httpStatusCode = 404;
          return res.status(404).json({
            responseCode: 2,
            message: "Fail to Upload File",
            data: {
              file: file,
            },
          });
        }
        else{
          console.log('req.file.path',req.file.path);
          var imagePath = req.file.path.replace("public\\", "");

          return res.status(200).json({
            responseCode: 1,
            message: 'Uploaded Succesfully',
            data: [{
              //file: file,
              filename: req.file.path,
            }]
          });
        }
         
      });//End of upload documents new
      
      ///This is to delete documents to server only 
      routes.post("/documents_new/delete", function (req, res) {
        const { img_path } = req.body;
        console.log('imgPath',img_path);
         
                try {
                  console.log("File removed..***********");
                  fs.unlinkSync(img_path);
                  //file removed
                } catch (err) {
                  console.error('errrrrr',err);
                  return res.status(404).json({
                    responseCode: 2,
                    message: 'Failed to remove file',
                    data: [],
                  });
                }
                 
                return res.status(200).json({
                  responseCode: 1,
                  message: 'Removed succesfully',
                  data: [],
                });
               
              }); //End of delete documents new



} catch (ex) {
    console.log(ex);
  }
module.exports = routes;
