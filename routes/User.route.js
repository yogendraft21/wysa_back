const express = require("express");
const { User }  = require('../models/User.model')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { sleep } = require("../models/Sleep.model");
const UserRoute = express.Router();
require("dotenv").config();
UserRoute.get("/",(req,res)=>{
    res.send("User")
})

UserRoute.post("/register",async(req,res)=>{
    const {name,password} = req.body;
    console.log(req.body);
    const data = await User.findOne({name:name})
    console.log(data)
    if(data){
        return res.send({status:'duplicate'})
    }
    try {
        bcrypt.hash(password,10,async(err,hash)=>{
            const user = new User({name:name,password:hash});
            await user.save();
            res.send({status:"success"});
        })
    } catch (error) {
        console.log("Problem in Signup");
    }
})
UserRoute.post("/login",async(req,res)=>{
    const {name,password} = req.body;
    const user = await User.findOne({name : name})
    // console.log(name,password)
    const data = await sleep.findOne({userId:user._id})
       console.log(data)
    try {
        
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({"userID":user._id},process.env.SECRET_KEY)
                    res.send({"msg":"Login Success","token":token,"data":data
                })
                }else{
                    res.send({"msg":"invalid"})
                }
            })
        }else{
            res.send({"msg":"invalid"})
        }
    } catch (error) {
        console.log("Problem in Login");
    }
})

module.exports={
    UserRoute
}