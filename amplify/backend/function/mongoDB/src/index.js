import { connect, set, connection as db } from 'mongoose'

exports.handler = async (event) => {
    const dbUrl = 'mongodb://127.0.0.1:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
    set('debug', true)
    db.on('error', err => {
  
      console.error('%s', err)
    })
    db.on('close', () => {
      console.log('Database connection closed.')
    })
    connect(dbUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 200
    }, function(error){
      if(!error){
        console.log("MongoDB connected successfully")
      }
      
    })
  
    db.on('disconnected', async function () {
      console.log('MongoDB disconnected!');
    });
    console.info(`Connected to ${dbUrl}`)
    return
};
