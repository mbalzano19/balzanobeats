import sendRequest from './send-request'

const BASE_URL = '/api/orders'


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