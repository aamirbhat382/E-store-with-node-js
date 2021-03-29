const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    let authHeader = req.cookies.jwt_youAreIn
    if (authHeader) {
        // let token = authHeader.split(' ')[1];
        // console.log(authHeader)
        jwt.verify(authHeader, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }
            req.user = user
            next()
        })
    } else {
        // 401 - unathorised
        // 403 - Forbidden, i know who are you but you dont permissions
        res.sendStatus(401)
    }
}

module.exports = auth