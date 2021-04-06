const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const Order = require('../../models/user/order')
const auth = require('../../middlewares/auth')
router.post('/', auth, (req, res) => {
    const { phone, items, address, stripeToken, paymentType } = req.body
    if (!phone || !address || !stripeToken || !items || !paymentType) {
        return res.status(422).json({ message: 'All fields are required' });
    }
    // console.log(req.body)
    let sum = 0
    const entries =
        Object.entries(JSON.parse(items))
    entries.forEach((element, index) => {
        priceOfProduct = element[1][2].slice(2, )
        Rate = Number(priceOfProduct)
        No_of_items = Number(element[1][0])
        let totelRate = Rate * No_of_items
        let elementPrice =

            sum += totelRate
    });
    const order = new Order({
        customerId: req.user._id,
        items: JSON.parse(items),
        phone,
        address
    })
    if (paymentType === 'card') {
        order.save().then(result => {
            Order.populate(result, { path: 'customerId' }, (err, placedOrder) => {
                stripe.charges.create({
                    amount: sum * 100,
                    source: stripeToken,
                    currency: 'inr',
                    description: `Pizza order: ${placedOrder._id}`
                }).then(() => {
                    placedOrder.paymentStatus = true
                    placedOrder.paymentType = paymentType
                    placedOrder.save().then((ord) => {
                        return res.json({ message: 'Payment successful, Order placed successfully', success: 'True', id: placedOrder._id });
                    }).catch((err) => {
                        console.log(err)
                    })

                }).catch((err) => {
                    return res.json({ message: ' payment failed, Try Again' });
                })

            })
        })
    }
})

module.exports = router