// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

// Build the connection string 
//var dbURI = 'mongodb://localhost/test'; 

var dbURI = {'url' : 'mongodb://heroku_k0bjb0t2:okksgs1kdsrke9nf2hd91k60vr@ds023480.mlab.com:23480/heroku_k0bjb0t2' };

console.log(dbURI);

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// BRING IN YOUR SCHEMAS & MODELS // For example 
require('./../models/user');   
