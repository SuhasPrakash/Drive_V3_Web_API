const express = require("express");
const login = express();
const dbpool = require("../../Database/db");
const sql = require("mssql");
const VerifyToken = require("../../../auth/VerifyToken");
const jwt = require("jsonwebtoken");
const configParams = require("../../../config/config");


const GetLogin = (req, res) => {
  const { OTP, mobileno } = req.body;
  try {
    dbpool.then((pool) => {
      let query =
        "exec GetFOLogin  @OTP='" + OTP + "'  , @mobileno='" + mobileno + "'";
        console.log('queryquery',query);
      pool.request().query(query, function (err, result) {
        if (err) {
          console.log("while creating pool req", err);
          return res.status(400).json({
            responseCode: null,
            error: "Request was unable to process",
            data: null,
          });
        }
        console.log(result.recordset.length);
        const success = result.recordset[0].success;
        const error = result.recordset[0].error;
        const message = result.recordset[0].response;
        console.log("result[0]", result.recordset[0]);
        if (success == "true") {
          const token = jwt.sign(
            {
              userdetails: result.recordset[0],
              exptime: new Date().getTime(),
            },
            configParams.secretKey,
            { expiresIn: "5h" }
          );
          console.log("Token", token);
          return res.status(200).json({
            responseCode: 1,
            message: 'Succesfully logged',
            data: result.recordset,
            token: token,
          });
        } else {
          return res.status(200).json({
            responseCode: 2,
            message: 'Login failed',
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
};

login.post("/login", GetLogin);

module.exports = login;
