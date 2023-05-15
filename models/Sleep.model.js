const mongoose = require('mongoose')

const sleepData = mongoose.Schema({
    struggle_hours:{
        type:Number,
        required:true
    },
    wake_time:{
        type:String,
        required:true
    },
    sleep_time:{
        type:String,
        required:true
    },
    total_sleep:{
        type:String,
        required:true
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    }
})

const sleep = mongoose.model("sleep-data",sleepData)

module.exports={
    sleep
}