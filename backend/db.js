const mongoose = require("mongoose");

function connectDB(){
    let url = 'mongodb+srv://minhnguyen:qwerty2002@cluster0.oozqx.mongodb.net/bike-app?retryWrites=true&w=majority'
    mongoose.connect(
        url, 
        {useUnifiedTopology: true , useNewUrlParser: true}
    )
    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}

connectDB()

module.exports = mongoose