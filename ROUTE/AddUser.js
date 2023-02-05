const express = require('express')
const {newUser, login} = require('../Controller/AddUser')

const Router = express.Router();

Router.route('/sign').post(newUser)
Router.route('/login').post(login)

module.exports = Router;