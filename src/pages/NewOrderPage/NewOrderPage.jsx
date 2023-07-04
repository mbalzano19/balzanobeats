import { useEffect, useState } from "react";
import { Navigate, useParams } from 'react-router-dom';
// import * as beatsAPI from '../../utilities/beats-api';
import { Link, useNavigate } from 'react-router-dom';
import * as ordersAPI from '../../utilities/orders-api';
import * as beatsAPI from '../../utilities/beats-api';
import OrderDetail from "../../components/OrderDetail/OrderDetail";

export default function NewOrderPage({ beat, currentPage }) {
    const { id } = useParams();
    const [cart, setCart] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    console.log('CURRENTPAGETHING', currentPage);
    console.log('BEAT IN NEW ORDER PAGE', beat);
  
    useEffect(() => {
      async function fetchData() {
        const beats = await beatsAPI.getAll(id);
        const beatCart = beats.find((beat) => beat._id === id);
        const fetchedCart = await ordersAPI.getCart();
        setCart(currentPage === '/orders/new' ? beatCart : fetchedCart);
        setIsLoading(false);
      }
      fetchData();
    }, [id, currentPage]);
  
    async function handleAddToOrder(beatId) {
      alert(`${beat.name} has been added to your cart!`);
      const updatedCart = await ordersAPI.addItemToCart(beatId);
      console.log('UPDATEDCART', updatedCart.beatItems)
    //   updatedCart.beatItems.forEach((item) => {
    //     item.extPrice = item.qty * item.price;
    //   });
      setCart(updatedCart);
      <Navigate to='/login'></Navigate>
    }
  
    async function handleChangeQty(cartId, beatId, newQty) {
      const updatedCart = await ordersAPI.setItemQtyInCart(cartId, beatId, newQty);
      console.log('handleChangeQuantity', updatedCart)
      setCart(updatedCart);
    }

  
    async function handleCheckout() {
      await ordersAPI.checkout();
      navigate('/orders');
    }
  
    return (
        <main>
          {isLoading ? (
            <div>Loading...</div>
          ) : currentPage === '/orders/new' ? (
            <OrderDetail
              cart={cart}
              handleChangeQty={handleChangeQty}
              handleCheckout={handleCheckout}
              beat={beat}
            />
          ) : (
            <button onClick={() => handleAddToOrder(beat._id)}>Add to Cart</button>
          )}
        </main>
      );
    }
  