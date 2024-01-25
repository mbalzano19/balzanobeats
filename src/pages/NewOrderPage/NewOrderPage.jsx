// import { useEffect, useState } from "react"
// import { Navigate, useParams } from 'react-router-dom'

// import { Link, useNavigate } from 'react-router-dom'
// import * as ordersAPI from '../../utilities/orders-api'
// import * as beatsAPI from '../../utilities/beats-api'
// import OrderDetail from "../../components/OrderDetail/OrderDetail"

// export default function NewOrderPage({ beat, currentPage }) {
//     const { id } = useParams()
//     const [cart, setCart] = useState(null)
//     const [isLoading, setIsLoading] = useState(true)
//     const navigate = useNavigate()
  
//   useEffect(() => {
//     async function fetchData() {
//       const beats = await beatsAPI.getAll(id)
//       const beatCart = beats.find((beat) => beat._id === id)
//       const fetchedCart = await ordersAPI.getCart()
//       setCart(currentPage === '/orders/new' ? beatCart : fetchedCart)
//       setIsLoading(false)
//     }
//       fetchData()
//   }, [id, currentPage])
  
//   async function handleAddToOrder(beatId) {
//     alert(`${beat.name} has been added to your cart!`)
//     const updatedCart = await ordersAPI.addItemToCart(beatId)
//     setCart(updatedCart);
//     <Navigate to='/login'></Navigate>
//   }
  
//   async function handleChangeQty(cartId, beatId, newQty) {
//     const updatedCart = await ordersAPI.setItemQtyInCart(cartId, beatId, newQty)
//     setCart(updatedCart)
//   }

//   async function handleCheckout() {
//     await ordersAPI.checkout()
//     navigate('/orders')
//   }
  
// return (
//   <main>
//     {isLoading ? (
//       <div>Loading...</div>
//     ) : currentPage === '/orders/new' ? (
//       <OrderDetail
//         cart={cart}
//         handleChangeQty={handleChangeQty}
//         handleCheckout={handleCheckout}
//         beat={beat}
//       />
//     ) : (
//       <button onClick={() => handleAddToOrder(beat._id)}>Add to Cart</button>
//     )}
//   </main>
// )
// }
  

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckOutForm/CheckOutForm";
import * as beatsAPI from '../../utilities/beats-api';
import * as ordersAPI from '../../utilities/orders-api';
import OrderDetail from "../../components/OrderDetail/OrderDetail";

const stripePromise = loadStripe("pk_test_51OcVXPFpV7Ztp8oxvGGGTmBhPcdIYL1JgFXfsJNKL6oeFi09iEjDhDhhEXWmQZAgxWrVgCc1kkOAaClObJvxsWMk00ItwT23Q9");

export default function NewOrderPage(props) {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const beats = await beatsAPI.getAll(id);
      const beatCart = beats.find((beat) => beat._id === id);
      const fetchedCart = await ordersAPI.getCart();
      setCart(beatCart || fetchedCart);
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  async function handleAddToOrder(beatId) {
    alert(`${props.beat.name} has been added to your cart!`);
    const updatedCart = await ordersAPI.addItemToCart(beatId);
    setCart(updatedCart);
    navigate('/orders/new'); // Redirect to the cart page after adding to the cart
  }

  async function handleChangeQty(cartId, beatId, newQty) {
    const updatedCart = await ordersAPI.setItemQtyInCart(cartId, beatId, newQty);
    setCart(updatedCart);
  }

  async function handleCheckout(beats) {
    try {
      // Create a Stripe Checkout session
      console.log('cart', cart)
      const beatsInCart = cart.beats
      console.log('props', props)
      console.log('About to make API call for checkout session');
      const session = await ordersAPI.createStripeCheckoutSession(cart);
      console.log('API call for checkout session completed', session);
      
      // Redirect to the Stripe Checkout page
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (error) {
        console.error('Error redirecting to Checkout:', error);
        // Handle error (e.g., show an error message to the user)
      }
    } catch (error) {
      console.error('Error creating Checkout session:', error);
      // Handle error (e.g., show an error message to the user)
    }
  
    // If you want to redirect to another page after successful checkout, you can use navigate
    navigate('/beats');
  }

  return (
    <main>
      {isLoading ? (
        <div>Loading...</div>
      ) : props.currentPage === '/orders/new' ? (
        <OrderDetail
          cart={cart}
          handleChangeQty={handleChangeQty}
          handleCheckout={handleCheckout}
          beat={props.beat} 
        />
      ) : (
        <button onClick={() => handleAddToOrder(id)}>Add to Cart</button>
      )}
    </main>
  );
}
