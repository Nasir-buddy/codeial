const mongoose = require('mongoose');

const dbCloud = 'mongodb+srv://nasir-ali:KNzAB6wNi6oSGZMs@cluster1.ktk27nx.mongodb.net/';

mongoose.connect(dbCloud);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error to connecting the MongoDB"));

db.once('open', function(){
    console.log("Connected to DataBase :: MongoDB Atlas");
});

module.exports = db;