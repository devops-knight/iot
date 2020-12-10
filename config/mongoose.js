const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/iot',{useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error while connecting to Database"));

db.once('open', function(){
    console.log(`Successfully Connected!!!`);
})

module.exports = db;