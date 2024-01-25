const YOUR_DOMAIN = process.env.YOUR_DOMAIN || 'http://localhost:3000';

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors')

require('dotenv').config()
require('./config/database')

const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.REACT_APP_AWS_REGION, // Set your desired AWS region
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID, // Set your AWS access key ID
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY // Set your AWS secret access key
});
   
const app = express();
   
app.use(logger('dev'));
app.use(express.json());

 // Configure both serve-favicon & static middleware
 // to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors({
  origin: ['http://localhost:3000', 'https://balzanobeats.onrender.com']
}))

// middleware to check and verify a JWT
// assign user object from the JWT to req.user
app.use(require('./config/checkToken'))

const port = process.env.PORT || 3001;
// const { createCheckoutSession } = require('./controllers/api/payments')
// setupPaymentRoutes(app);
	
// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/beats', require('./routes/api/beats'))
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api/payments', require('./routes/api/payments'))

// app.post('/api/checkout/session', createCheckoutSession);

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});