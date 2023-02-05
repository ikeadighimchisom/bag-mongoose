const AddBag = require('../models/addBags')
const cloudinary = require("../cloudinary/clodi");

exports.NewBags = async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const bagData = {
            fullName:req.body.fullName,
            desc:req.body.desc,
            price:req.body.price,
            image:result.secure_url,
            cloudId:result.public_id
        }
        // const data = {fullName, dec, price,image,cloudId}
        const created = await AddBag.create(bagData);
        res.status(201).json({
            message: "New Bag Added",
            data: created
        });


    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}

exports.GetallBags = async (req, res) => {
    try{
        const allBags = await AddBag.find();
        res.status(201).json({
            message: "AllBags",
            length: allBags.length,
            data: allBags
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}

exports.DeleteBags = async (req, res) => {
    try{
        const productid = req.params.productid
         await AddBag.findByIdAndDelete(productid);
        res.status(204).json({
            message: "Deleted",
        });

    }catch(e){
        res.status(400).json({
            message: e.message
        });
    }
}

// const newUpdate = async(req, res) => {
//     try{
//         const id = req.params.id;
//         const newUpdate = {
//             name: req.body.name,
//             age: req.body.age,
//             price: req.body.price,
//             total: req.body.total
//         }
//         const update = await distriModel.update(newUpdate, {
//             where: {id:id}
//         })
//         if(! newUpdate === 0) {
//             res.status(400).json({
//                 message: "update is not succesfful",
//             })
//         } else {
//             res.status(201).json({
//                 message: "update was successful",
//                 data: newUpdate
//             })
//         }
//     } catch (err) {
//         res.status(400).json({
//             message: err.message
//         });
//     }
// }
            