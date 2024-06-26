import express from 'express'
import mongoose from 'mongoose'


const dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URL,{
        dbName:"PORTFOLIO",
    })
    .then(()=>{
        console.log('Connected to database');
    })
    .catch((error)=>{
        console.log(`Some error occur while connecting to Database ${error}`);
    })

    }

    export default dbconnection;