require('dotenv').config()
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config({path: '../CONFIG/config.env'})


const mailSender = async (options) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chisomike723@gmail.com",
        pass: "afguozeophrpwzfo",
        secure: false
      },
    })
    let mailOptions = {
      from: "chisomike723@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.message,
    }
    await transporter.sendMail(mailOptions)
  }
  module.exports = mailSender;

  