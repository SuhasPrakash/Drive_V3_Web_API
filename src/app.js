const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./frameworks/web/routes');



require('dotenv').config();
try{
const app = express();
const port = process.env.PORT || 3002;


app.use((req, res, next) => {
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

    // load middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // load routes
    app.use('/api', routes);
    //app.use('/fleet/v1', routes);
    

    // generic error handler
    //app.use(ErrorHandler);

    // eslint-disable-next-line arrow-body-style
    app.listen(port, () => console.log(`http://localhost:${port}`));
    
    app.get("/", (req, res, next) => {
        res.status(200).json({ message: "App Running" });
      });
    console.log('ready11');
   
}
catch(ex)
{
    console.log(ex);
}