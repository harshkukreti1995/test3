/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const moment = require('moment');
const logging = require('/opt/logs');
// const mongo = require('test3logging/mongoDB');
const mongoOPT = require('/opt/mongoDBOPT');
const mongoose = require('mongoose');

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

let getTodoById = (db, table, query) => {
  return db
    .collection(table)
    .findOne(query);
}


/**********************
 * Example get method *
 **********************/
// app.configure(function() {
//   // let dbConnection =await logging.connectToDatabase1("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");

//   app.set('dbConnection', 'dbConnection123'); 

// });

app.use(async function (req, res, next) {
  // res.locals.dbConnection= await logging.connectToDatabase1("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");
      const dbConnection= await logging.connectToDatabase1("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");
app.set('dbConnection', dbConnection); 
   next();
});

app.get('/profile', async function(req, res) {
  // Add your code here
  // let dbConnection = res.locals.dbConnection;
let dbConnection = app.get('dbConnection')
  const todo = await getTodoById(dbConnection, "todos", { name: req.query.name });
  res.json({success: 'get call succeed harsh !', url: todo});
});

app.get('/profile/abc',async function(req, res) {
  // Add your code here
  // const dbConnection = await logging.connectToDatabase1("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");
  const conn = await mongoOPT.connectToDB();
  // console.log("conn:",dbConnection);
  res.json({success: 'get call succeed!', url:conn });
});


app.get('/profile/env',async function(req, res) {
  // Add your code here
  // const dbConnection = await logging.connectToDatabase1("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");
  // const conn = await mongoOPT.connectToDB();
  // console.log("conn:",dbConnection);
  res.json({success: 'get call succeed!', url:process.env.testENV });
});

/****************************
* Example post method *
****************************/

app.post('/profile', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/profile/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/profile', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/profile/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/profile', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/profile/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
 