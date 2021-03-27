const express = require('express')
const router = express.Router()
const User = require('../../models/user/user')
const jwt = require("jsonwebtoken");
const Refresh = require("../../models/user/refresh");
const bcrypt = require("bcrypt");

router.get('/', (req, res) => {
    res.render('auth/singup')
})

router.post("/register", async(req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(401).send("All Filed's  are required");
    }
    // check if user exist
    User.exists({ email: email }, async(err, result) => {
            if (result) {
                return res.send("User With This Email Exist's");
            }
        })
        // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    user.save().then((response) => {
        const accessToken = jwt.sign({
                name: response.name,
                email: response.email,
            },
            "keygoeshere"
        );

        const refreshToken = jwt.sign({
                name: response.name,
                email: response.email,
            },
            "RefreshToken"
        );

        // Save refresh token in database

        const refreshTokenDocument = new Refresh({
            Token: refreshToken
        });
        refreshTokenDocument.save().then((doc) => {
            res.setHeader(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "type", "Bearer"
            )
            const headers = {
                accessToken: accessToken,
                refreshToken: refreshToken,
                type: "Bearer",
            };
            return res.render("home/main", { headers })

        }).catch((err) => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err)
    });
});

module.exports = router;