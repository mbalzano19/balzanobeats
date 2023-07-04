const express = require('express')
const router = express.Router()
const ordersCtrl = require('../../controllers/api/orders')


router.get('/cart', ordersCtrl.cart)

router.post('/cart/beats/:id', ordersCtrl.addToCart)

router.post('/cart/checkout', ordersCtrl.checkout)

router.put('/cart/:cartId/:beatId/qty', ordersCtrl.setItemQtyInCart)

module.exports = router