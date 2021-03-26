const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },

    productPrice: {
        type: String,
        required: true
    },
    productDatiles: {
        type: String,
        required: true
    },
    productImage: {
        type: Buffer,
        required: true
    },
    productImageType: {
        type: String,
        required: true
    }
})

bookSchema.virtual('productImagePath').get(function() {
    if (this.productImage != null && this.productImageType != null) {
        return `data:${this.productImageType};charset=utf-8;base64,${this.productImage.toString('base64')}`
    }
})

module.exports = mongoose.model('Product', bookSchema)