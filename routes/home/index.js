const express = require('express')
const router = express.Router()
const Product = require('../../models/admin/product_model')
const auth = require('../../middlewares/auth')

router.get('/', (req, res) => {
    const prouduct = Product.find().then(result => {
        res.render('home/index', { result: result })
    }).catch(err => {
        console.log(err);
    })

})
router.get('/cart', auth, (req, res) => {
    res.render('home/cart')
})
module.exports = router