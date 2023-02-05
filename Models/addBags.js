const mongoose = require('mongoose')

const BagsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Fullname is required"]
    },
    desc: {
        type: String,
        required: [true, "dec is required"],
    },
    price: {
        type: String,
        required: [true, "price is required"],
    },
     image:{ 
       type: String,
     },
     cloudId:{ 
        type: String,
      },

},
{
    timestamps: true
})

const AddBag = mongoose.model('AddBag', BagsSchema)
module.exports= AddBag