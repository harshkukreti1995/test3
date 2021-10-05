const mongoose = require('mongoose');

module.exports.testMongo = () => {
    return 'working mongo';
};

module.exports.connectToDB = () => {
    const mongooseConnector = mongoose.connect('mongodb+srv://ohndev_usr:iPTXAyeSHZmz9uoZ@appinventiv-development.4btuu.mongodb.net/ohndev_db?retryWrites=true&w=majority');
    return mongooseConnector;
};