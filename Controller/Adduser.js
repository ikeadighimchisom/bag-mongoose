// require('dotenv').config()
const dotenv = require("dotenv")
const AddUser = require('../Models/AddUser')
dotenv.config({path: './CONFIG/config.env'})
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../Utils/Email")

exports.newUser = async(req, res) => {
    try{
        const {fullname, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            fullname,
            email,
            password: hash,
        }
        const createUser = await AddUser(data)
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
              IsAdmin:createUser.isAdmin}, 
              process.env.JWTTOKEN,{expiresIn: "1d"})

            createUser.token = myToken,
            createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
            mailSender({
            email: createUser.email,
            subject: "Kindly verify",
            message,
            });


             res.status(201).json({
                message: "User created",
                data: createUser
             });


      } catch(err) {
            res.status(400).json({
            message: err.message
        });
    }
}



exports.login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const check = await AddUser.findOne({email:email})
        if(!check) return res.status(404).json({
            message: "Not found"
        })
        const isPassword = await bcryptjs.compare(password, check.password)
        if(!isPassword) return res.status(404).json({message: "Email or password incorrect"})

        const myToken = jwt.sign({
            id:check._id,
            password: check.password,
            IsAdmin:check.isAdmin},  process.env.JWTTOKEN ,{expiresIn: "1d"})

            check.token = myToken 
            await check.save()
            res.status(201).json({
            message:"Successful",
            data:check
         })
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.UserVerify = async (req, res) => {
    try{    
        const userid = req.params.userid
        const user = await AddUser.findById(userid)
        await AddUser.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new : true
            }
        )

        res.status(200).json({
            message: "you have been verified"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

exports.Forgotpassword = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await AddUser.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsAdmin:userEmail.isAdmin}, process.env.JWTTOKEN, {expiresIn: "1m"})

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${userEmail._id}/${myToken}`
        const message = `Use this link ${VerifyLink} to change your password`;
        sendEmail({
          email: userEmail.email,
          subject: "Reset Pasword",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })

        // console.log(userEmail);
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


exports.resetpassword = async (req, res) => {
    try {
        const {password} = req.body
        const id = req.params.id
        const passwordchange = await AddUser.findById(id)
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        await AddUser.findByIdAndUpdate(passwordchange._id,{
            password: hash
        },{new: true})

        res.status(202).json({
            message:"password updated"
        })

    } catch (err) {
        res.status(400).json({
            message:err.message
        })
    }
}


exports.confirm = async(req,res)=>{
    try {
        const {password} = req.body;
        const userId = req.params.userId;
        const saltPwd = await bcrypt.genSalt(10);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const users = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(users._id,{
            password: hassPwd
        },
        {
            new: true
        } )
        res.send("Successfully changed...")
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

// exports.changepassword = async (req, res) => {
//     try {
//         const {password} = req.body
//         const id = req.params.id
//         const passwordchange = await AddUser.findById(id)
//         const isPassword =await bcryptjs.compare(password,passwordchange.password)
//         const salt = bcryptjs.genSaltSync(10);
//         const hash = bcryptjs.hashSync(password, salt);

//         await AddUser.findByIdAndUpdate(passwordchange._id,{
//             password: hash
//         },{new: true})

//         res.status(202).json({
//             message:"password updated"
//         })

//     } catch (err) {
//         res.status(400).json({
//             message:err.message
//         })
//     }
// }