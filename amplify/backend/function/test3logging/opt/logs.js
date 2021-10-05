const mongo = require('mongodb');
const { MongoClient } = mongo;
let db = null;

exports.log = ()=>{
    return "Logging layer working correctly"
}

exports.connectToDatabase1 = (uri, dbName) => {
    if (db && db.serverConfig && db.serverConfig.isConnected()) {
      return Promise.resolve(db);
    }
    return MongoClient.connect(uri, {  useNewUrlParser: true, useUnifiedTopology: true }).then(client => {
      db = client.db(dbName);
      return db;
    });
};

exports.testLog = ()=>{
    return "testLog layer working correctly"
}