const express = require('express');
import { apolloServer } from './apollo';
import { paypal } from './routes';
import bodyParser from 'body-parser'

const app = express();

//Additional middleware can be mounted at this point to run before apollo

// parse application/json
app.use(bodyParser.json({ limit: '50mb' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

apolloServer.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: (origin, callback) => {
     
    if (process.env.NODE_ENV==='undefined' || process.env.NODE_ENV === 'development') return callback(null, true);
    
        const whitelist = [
           "https://www.sjinet.com",
           "http://www.sjinet.com.s3-website.eu-west-2.amazonaws.com",
           "https://sjinetapi-24.herokuapp.com",
           "https://sjinetapi-24.herokuapp.com/graphql",
           "https://api.sandbox.paypal.com",
           "https://api.sandbox.paypal.com/",
           
       ];
       if (whitelist.indexOf(origin) !== -1){
           callback(null, true)
       }else{
        console.log(origin);
           callback(new Error('Not Allowed by CORS'))
       }
       
    }
} 

});

//register webhooks here
app.use('/paypal', paypal);

export default app;
