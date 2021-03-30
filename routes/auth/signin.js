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
            return res.status(422).json({ error: 'All fields are required' })
        }
        const password = req.body.password
        const uesremail = await User.findOne({ email: req.body.email })
        const isMatch = await bcrypt.compare(password, uesremail.password)
        const token = await uesremail.generateAuthToken()
        if (isMatch) {
            res.cookie('jwt_youAreIn', token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true })
            return res.redirect('/')
        } else {
            return res.status(401).json({ error: 'Username or password is wrong!' })
        }
    } catch (error) {
        return res.status(401).json({ error: 'Username or password is wrong!' })
    }
})


module.exports = router