const express = require('express')
const router = express.Router()
const User = require('../../models/user/user')
const loginUser = require('../../middlewares/loginuser')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.get('/', loginUser, (req, res) => {
    res.render('auth/signup')
})

router.post('/register', loginUser, (req, res) => {
    // console.log(req.body);
    const { name, email, password } = req.body
        // check for required 
    if (!name || !email || !password) {
        return res.status(422).json({ error: 'All fields are required' })
    }

    User.findOne({ email: email }).then(async result => {
        if (result) {
            return res.status(422).json({ error: 'User with this email already exist!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const token = await user.generateAuthToken()
        user.save().then(response => {
            res.cookie('jwt_register', token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24), httpOnly: true })
            return res.redirect('/')
        }).catch(err => {
            return res.status(500).send({ error: 'Something went wrong' });
        })
    })
})

// login

module.exports = router;