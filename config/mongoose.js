const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/practice_node_db')

var db = mongoose.connection;
db.on('error',console.log.bind("error in connecting database"))

db.once('open', function(){
    console.log("Successfully connected to database")
})