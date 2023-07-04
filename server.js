const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
require('dotenv').config()
require('./config/database')

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1', // Set your desired AWS region
  accessKeyId: 'AKIA2JNXEQL57AFPQ345', // Set your AWS access key ID
  secretAccessKey: 'gQiTYd+P/SlT9aaZT1SJ/mC3Tp/nYqXLBeZ0kgGF' // Set your AWS secret access key
});
   
const app = express();
   
app.use(logger('dev'));
app.use(express.json());

 // Configure both serve-favicon & static middleware
 // to serve from the production 'build' folder
// app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

// middleware to check and verify a JWT
// assign user object from the JWT to req.user
app.use(require('./config/checkToken'))

const port = process.env.PORT || 3001;
	
// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'))
app.use('/api/beats', require('./routes/api/beats'))
app.use('/api/orders', require('./routes/api/orders'))
// app.use('/api/upload', require('./routes/api/upload'))
// app.use('/api/categories', require('./routes/api/categories'))


// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });


app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
});