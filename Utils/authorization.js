require('dotenv').config()
const AddUser = require('../Models/AddUser')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config({path: './CONFIG/config.env'})

const isSignIn = async (req, res, next) => {
        const userid = req.params.userid;
        const user = await AddUser.findById(userid)
        // console.log(user);
        const authToken = user.token;
        if(!authToken) return res.status(401).json({message: "Not authorized"});
       jwt.verify(authToken, process.env.JWTTOKEN, (err, payload)=>{
         if(err) return res.status(401).json({message: err.message})
            req.user = payload
            next()
            // console.log(res.user);
        })       
}

const IsAdminAuth = (req, res, next)=>{
    isSignIn(req, res, ()=>{
        // console.log("lookig", req.user);
        if(req.user.IsAdmin){
            next()
        }else{
            res.status(403).json({message: "You are not an admin"})
        }
    })
}

module.exports = {IsAdminAuth}



