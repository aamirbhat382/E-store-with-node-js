const express = require('express')
const router = express.Router()
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require('../../models/user/user')
const loginUser = require('../../middlewares/loginuser')



router.get('/', loginUser, (req, res) => {
    res.render('auth/signin')
})
router.post('/login', loginUser, async(req, res) => {
    // check for required 
    try {
        if (!req.body.email || !req.body.password) {
            req.flash('error', 'All fields are required')
            return res.status(422).redirect('/signin')
        }
        const password = req.body.password
        const uesremail = await User.findOne({ email: req.body.email })
        const isMatch = await bcrypt.compare(password, uesremail.password)
        const token = await uesremail.generateAuthToken()
        if (isMatch) {
            res.cookie('jwt_youAreIn', token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), httpOnly: true })
            return res.redirect('/')
        } else {
            req.flash('error', 'Username or password is wrong!')
            return res.status(401).redirect('/signin')
        }
    } catch (error) {
        req.flash('error', 'Username or password is wrong!')
        return res.status(401).redirect('/signin')
    }
})


module.exports = router