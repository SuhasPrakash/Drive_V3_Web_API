var jwt = require('jsonwebtoken');
var config = require('../config/config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ responseCode : 2,auth: false, message: 'No token provided.' });
 
  jwt.verify(token, config.secretKey, function(err, decoded) {
    if (err)
    return res.status(500).send({ responseCode : 2, auth: false, message: 'Failed to authenticate token.' });
    
    if (Date.now() >= decoded.exptime * 1000) {
      return res.status(500).send({ responseCode : 2, auth: false, message: 'Token Expired.' });
     // return false;
    }
    console.log('Verify :',decoded);

    req.userdetails=decoded.userdetails; 
    console.log('req.userdetails decoded.userdetail',req.userdetails,decoded.userdetails);
    next();
  });
}

module.exports = verifyToken;