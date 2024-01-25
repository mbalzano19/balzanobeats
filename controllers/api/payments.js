const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createCheckoutSession(req, res) {
  const { beatsInCart, totalAmount } = req.body;

  try {
    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: beatsInCart.map((beat) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: beat.name,
              // Add other product data as needed
            },
            unit_amount: beat.price * 100, // Stripe expects amount in cents
          },
          quantity: beat.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${YOUR_DOMAIN}/success`, // Specify your success URL
      cancel_url: `${YOUR_DOMAIN}/cancel`, // Specify your cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Checkout session:', error);
    res.status(500).send({ error: 'Failed to create Checkout session' });
  }
}

module.exports = { createCheckoutSession };
