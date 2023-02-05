// require('dotenv').config()
const dotenv = require("dotenv")
const express = require('express');
dotenv.config({path: './CONFIG/config.env'})
const Auth = require('./ROUTE/AddUser')
const cors = require("cors")
const adminRoute = require('./ROUTE/adminRoute');
const user = require ('./ROUTE/user');
const fileUpload = require('express-fileupload');


const app = express ();
app.use( cors ());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))

app.use('/api', Auth);
app.use('/api', adminRoute);
app.use("/api", user)

app.use('/', (req, res) => {
    res.status(200).send("My Api is working")
});
module.exports = app;
