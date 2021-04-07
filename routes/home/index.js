const express = require('express')
const router = express.Router()
const Product = require('../../models/admin/product_model')
const Order = require('../../models/user/order')
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

router.get('/checkout', auth, (req, res) => {
    res.render('home/checkout')
})

router.get('/view/:id', async(req, res) => {
    const product = await Product.findById(req.params.id)
    res.render('home/view', { product })
})
router.get('/profile', auth, (req, res) => {
    res.render('home/profile')
})
router.get('/orders', auth, async(req, res) => {
    const orders = await Order.find({ customerId: req.user._id },
        null, { sort: { 'createdAt': -1 } })
    res.header('Cache-Control', 'no-store')
    res.render('home/orders', { orders: orders })
})
router.get('/status/orders/:id', auth, async(req, res) => {
    const order = await Order.findById(req.params.id)
        // Authorize user
    if (req.user._id.toString() === order.customerId.toString()) {
        return res.render('home/singleOrder', { order })
    }
    return res.redirect('/')
})
module.exports = router