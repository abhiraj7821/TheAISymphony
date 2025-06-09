const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB(){
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("DB CONNECTION SUCCESSFUL");
    } catch(error){
        console.log("DB CONNECTION ERROR");
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDB;