import sendRequest from './send-request'

// const BASE_URL = '/api/orders'
const BASE_URL = 'https://balzanobeats-api.onrender.com/api/orders'


export function getCart() {
  return sendRequest(`${BASE_URL}/cart`)
}

export function addItemToCart(beatId) {
  return sendRequest(`${BASE_URL}/cart/beats/${beatId}`, 'POST')
}

export function setItemQtyInCart(cartId, beatId, newQty) {
  return sendRequest(`${BASE_URL}/cart/${cartId}/${beatId}/qty`, 'PUT', { cartId, beatId, newQty })
}

export function checkout() {
  return sendRequest(`${BASE_URL}/cart/checkout`, 'POST')
}

export function handlePayment(tokenId, cartId) {
  return sendRequest(`${BASE_URL}/cart/payment`, 'POST', { tokenId, cartId });
}

export function createStripeCheckoutSession(beatsInCart) {
  const finalCart = beatsInCart.beatItems
  console.log('finalCart', finalCart)
  console.log('beatsincart', beatsInCart)
  if (!Array.isArray(finalCart)) {
    // Handle the case where beatsInCart is not an array
    console.error('Invalid beatsInCart format');
    return Promise.reject(new Error('Invalid beatsInCart format'));
  }

  // Calculate the total amount based on beats in the cart
  const totalAmount = finalCart.reduce((total, beat) => {
    console.log('beat.price', beat.beat.price)
    console.log('beat.qty', beat.qty)
    return total + (beat.beat.price || 0) * (beat.qty || 1);
  }, 0);
  console.log('totalAmount', totalAmount)
  return sendRequest(`${BASE_URL}/checkout/session`, 'POST', { finalCart, totalAmount });
}
