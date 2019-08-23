jest.setTimeout(30000);
const mongoose = require('mongoose');
const keys = require('../config/keys');


mongoose.Promise = global.Promise;
console.log("DB", keys.mongoURI);
mongoose.connect(keys.mongoURI, {useMongoClient: true});