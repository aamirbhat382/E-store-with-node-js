const express = require('express')
const router = express.Router()
const Product = require('../../models/admin/product_model')

router.get('/', (req, res) => {
    const prouduct = Product.find().then(result => {
        res.render('home/index', { result: result })
    }).catch(err => {
        console.log(err);
    })

})
module.exports = router