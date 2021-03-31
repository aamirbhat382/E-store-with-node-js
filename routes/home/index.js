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
router.get('/cart', (req, res) => {
    res.render('home/cart')
})

router.get('/view/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('home/view', { product })
})
router.get('/profile', (req, res) => {
    res.render('home/profile')
})
module.exports = router