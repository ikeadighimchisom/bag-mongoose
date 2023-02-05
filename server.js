// require('dotenv').config()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path: './CONFIG/config.env'});

const PORT = 8080

const app = require('./App')

const Db = process.env.DATABASE

mongoose.set("strictQuery", true)

mongoose.connect(Db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
} ).then(() => {
    console.log("MongooseDB connected")
}).catch((err)=>{
    console.log(err.message)
});

 process.env.PORT

app.listen(PORT || 5000, ()=>{
    console.log('connected');
})



