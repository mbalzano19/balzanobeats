import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import * as ordersAPI from '../../utilities/orders-api';

const CheckoutForm = ({ cart, handleCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setLoading(true);

    // Create a PaymentMethod using the card element.
    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    // Handle the payment on your backend
    try {
      await handlePayment(token.id, cart._id); // Replace with your backend logic
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handlePayment = async (tokenId, cartId) => {
    // Call your backend API to handle the payment
    await ordersAPI.handlePayment(tokenId, cartId); // Replace with your backend API endpoint
    handleCheckout(); // Redirect or handle the success case
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Card details
        <CardElement />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
