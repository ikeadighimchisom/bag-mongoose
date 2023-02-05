const express = require('express')
const {GetallBags} = require('../controller/Bags')

const {confirm,UserVerify,Forgotpassword,resetpassword,newUser,login} = require('../controller/AddUser')


const router = express.Router();


router.route('/user').get(GetallBags)
router.route('/userVerify/:userid').post(UserVerify);
router.route("/forgotpaasword").post(Forgotpassword);
router.route("/changepassword/:id/:token").post(resetpassword)
router.route("/password/:userId/:token").post(confirm);
// router.route("/password/:userId/:token").post(newUser);
// router.route("/password/:userId/:token").post(login);
// // Router.route("/changepaasword/:id").post(changepassword)


module.exports = router
