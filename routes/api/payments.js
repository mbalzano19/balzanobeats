const express = require('express');
const router = express.Router();
const paymentsController = require('../../controllers/api/payments');

router.post('/cart/payment', async (req, res) => {
  const { tokenId, cartId } = req.body;

  try {
    // Call the handlePayment function from the controller
    const result = await paymentsController.handlePayment(tokenId, cartId);

    // Handle the success case
    res.sendStatus(200);
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).send({ error: 'Payment failed' });
  }
});

router.post('/checkout/session', paymentsController.createCheckoutSession)

module.exports = router;