
const express = require('express');
const { Connection } = require('./config/db');
const { UserRoute } = require('./routes/User.route');
const { SleepRoute } = require('./routes/Sleep.route');
const { auth } = require('./middleware/auth');
const app = express();
const port = 3000;

app.use(express.json())
const cors = require('cors');
app.use(cors());

app.get("/",(req,res)=>{
    res.send("Wysa Assignment")
})

app.use("/user",UserRoute);
app.use(auth)
app.use("/sleep",SleepRoute);

app.listen(port,async()=>{
    try {
        await Connection;
        console.log("DB connected Success")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Server is Running on",port)
})