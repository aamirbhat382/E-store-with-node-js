const nodemailer = require('nodemailer');
const express = require('express')
const router = express.Router()
const auth = require('../../middlewares/auth')
const User = require('../../models/user/user');
const user = require('../../models/user/user');

let OTP = Math.random();
OTP = OTP * 1000000;
OTP = parseInt(OTP);


let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: 'Gmail',

    auth: {
        user: 'email',
        pass: 'password',
    }

});

router.get('/otp', auth, (req, res) => {

    res.render('auth/otp')

});
router.get('/', auth, async(req, res) => {
    const userId = req.user._id
    const user = await User.findById(userId)
    try {
        if (user.verify == 'false') {
            let mailOptions = {
                to: user.email,
                subject: "OTP for account verification is: ",
                html: "<h3>OTP For Account Verification Is </h3>" + "<h1 style='font-weight:bold; color:indigo;'>" + OTP + "</h1>"
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {

                    return res.redirect('/profile')

                }
                res.redirect('/verify/otp')
            });
        } else {
            res.redirect('/')
        }
    } catch (error) {

    }

});

router.post('/otp', auth, async(req, res) => {
    if (req.body.OTP == OTP) {
        const userId = req.user._id
        const user = await User.findByIdAndUpdate(userId, { verify: 'true' })
        return res.redirect('/profile')
    } else {
        res.redirect('/verify/otp')
    }
})

module.exports = router