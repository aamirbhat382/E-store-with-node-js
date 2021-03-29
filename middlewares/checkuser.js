const jwt = require('jsonwebtoken')
const User = require('../models/user/user')

function checkUser(req, res, next) {

    let authHeader = req.cookies.jwt_youAreIn
    if (authHeader) {
        jwt.verify(authHeader, process.env.JWT_SECRET, async(err, user) => {
            if (err) {
                log(err)
                res.locals.user = null
                next()
            } else {
                let currentUser = await User.findById(user._id)
                res.locals.user = currentUser
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}

module.exports = checkUser