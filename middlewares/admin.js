const jwt = require('jsonwebtoken')
const User = require('../models/user/user')

function admin(req, res, next) {
    let authHeader = req.cookies.jwt_youAreIn
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, async(err, user) => {
            if (err) {
                res.redirect('/')
            } else {
                let admin = await User.findById(user._id)
                if (admin.role === 'admin') {
                    next()
                } else {
                    res.redirect('/')
                }
            }
        })
    } else {
        res.redirect('/')
    }
}

module.exports = admin