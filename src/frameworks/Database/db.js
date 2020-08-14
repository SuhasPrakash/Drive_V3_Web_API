var sql = require('mssql');

    // config for the mssql database
    // var dbconfig = {
    //     user: 'WebAppUser',
    //     password: 'Web@Drive190',
    //     server: '52.172.157.77', 
    //     port: 14334,
    //     database: 'drive' ,
    //     options: {
    //         enableArithAbort: true,
    //         encrypt: false
    //     }
    // };

     var dbconfig = {
         user: 'suhas@suntelematics.com',
         password: 'suhas@12',
         server: '52.172.156.163',
         port: 14334,
         database: 'drive' ,
         options: {
             enableArithAbort: true,
             encrypt: false
         }
     };

 
const pool = new sql.ConnectionPool(dbconfig);
const poolConnect = pool.connect();
pool.on('error', err => {
    // ... error handler
});

module.exports = poolConnect;