// // Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// // Set the region 
// AWS.config.update({region: 'REGION'});

// // Create S3 service object
// s3 = new AWS.S3({apiVersion: '2006-03-01'});

// // Call S3 to list the buckets
// s3.listBuckets(function(err, data) {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data.Buckets);
//   }
// });


const s3 = new AWS.S3();

// Define the parameters for the S3 upload
const params = {
  Bucket: 'YOUR_BUCKET_NAME', // Set your S3 bucket name
  Key: 'example.jpg', // Set the desired key (file name) for the uploaded file
  Body: 'FILE_CONTENTS' // Set the contents of the file you want to upload
};

// Upload the file to the S3 bucket
s3.upload(params, (err, data) => {
  if (err) {
    console.error('Error uploading file:', err);
  } else {
    console.log('File uploaded successfully:', data.Location);
    // Save the file reference (e.g., data.Location) to your database for later retrieval
  }
});