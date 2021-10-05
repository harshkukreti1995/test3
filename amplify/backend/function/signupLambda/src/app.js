/* Amplify Params - DO NOT EDIT
	ENV
	FUNCTION_MONGODB_NAME
	REGION
Amplify Params - DO NOT EDIT *//*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
// const logging = require('./logs');
// const moment = require('moment');

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

const mongo = require('mongodb');
const { MongoClient } = mongo;
let db = null;

let connectToDatabase = (uri, dbName) => {
  if (db && db.serverConfig && db.serverConfig.isConnected()) {
    return Promise.resolve(db);
  }
  return MongoClient.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
    db = client.db(dbName);
    return db;
  });
};

let getTodoById = (db, table, query) => {
  return db
    .collection(table)
    .findOne(query);
}

let postTodo = (db, table, data) => {
  return db
    .collection(table)
    .insertOne(data);
}

// const dbConnection =  connectToDatabase("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");

/**********************
 * Example get method *
 **********************/
app.post('/signup', async function(req, res) {
  let body = req.body; 
  const dbConnection = await connectToDatabase("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");
  const todo = await postTodo(dbConnection, "todos", {name:body.name,age:body.age});
  
  // conn.collection('aaa').insertOne(user);
  res.json({success: 'get call succeed!', data: todo});
});

app.get('/signup', async function(req, res) {
  // Add your code here
  const dbConnection = await connectToDatabase("mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority", "ohndev_db");

  const todo = await getTodoById(dbConnection, "todos", { name: req.query.name });

  res.json({success: 'get call succeed!', todo: todo});
});

app.listen(3000, function() {
    console.log("App started")
});


// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
