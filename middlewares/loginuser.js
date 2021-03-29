const jwt = require('jsonwebtoken')
const User = require('../models/user/user')

function loginUser(req, res, next) {

    let authHeader = req.cookies.jwt_youAreIn
    if (authHeader) {
        res.redirect('/')
    } else {
        next()
    }
}

module.exports = loginUser