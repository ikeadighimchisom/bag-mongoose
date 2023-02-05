const express = require('express');
const {IsAdminAuth} = require('../utils/authorization');

const {NewBags,DeleteBags} = require('../Controller/Bags');

const router = express.Router();

router.post('/admin/:userid', IsAdminAuth, NewBags)
// router.post('/admin/:id', IsAdminAuth,AdminSingin)
// router.post('/admin/:id', IsAdminAuth,Adminlogin)
router.delete('/admin/:id/:productid', IsAdminAuth, DeleteBags)


module.exports = router