const express = require('express')
const router = express.Router()
const Product = require('../../models/admin/product_model')
const admin = require('../../middlewares/admin')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']

function saveImage(book, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null) {
        book.productImage = new Buffer.from(cover.data, 'base64')
        book.productImageType = cover.type
    }
}
router.get('/', admin, (req, res) => {
    const prouduct = Product.find().then(result => {
        res.render('admin/dashboard', { result: result })
    }).catch(err => {
        console.log(err);
    })

})
router.get('/upload', admin, (req, res) => {
    res.render('admin/upload')
})

router.post('/upload', admin, async(req, res) => {
    const { productName, productPrice, productDatiles, productImage } = req.body
    if (!productName || !productPrice || !productDatiles || !productImage) {
        return res.send("All Fileds Are Required")
    }
    const product = new Product({
        productName,
        productPrice,
        productDatiles
    })
    saveImage(product, productImage)
    try {
        await product.save()
            // console.log(book);
        res.send("Success")
    } catch (error) {
        console.log(error)
    }
})


module.exports = router