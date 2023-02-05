const mongoose = require('mongoose')

const AddusersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: [true, 'Fullname is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password is required"]
    },
    token:{
        type: String,
    },
    verify: { 
        type: Boolean,
        default: false
     },

    isAdmin: {  
        type: Boolean,
        default: false
    },

}, 
{
    timestamps: true
});

const Adduser = mongoose.model('AddUser', AddusersSchema)
module.exports = Adduser