var mongoose = require('mongoose')


//Connection
mongoose.connect("mongodb+srv://kamilanasrin:kamila@cluster0.apqppba.mongodb.net/Job?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log(" db Connected")
        
    }
    )
    .catch((err) => { 
        console.log(err)

    })