import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BeatItem from "../BeatItem/BeatItem";
import * as ordersAPI from '../../utilities/orders-api';
import * as beatsAPI from '../../utilities/beats-api';

export default function OrderDetail(props) {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  // if (!order) return null;
  // console.log('ORDER', order)
  // console.log('beatORDERORDOEOR', beats)
  console.log('beatORDERORDOEOR', props)
  

  useEffect(() => {
    async function fetchData() {
      const beats = await beatsAPI.getAll(id);
      const beatCart = beats.find((beat) => beat._id === id);
      const fetchedCart = await ordersAPI.getCart()

      console.log('FETCHEDCART ORDER DETAIL', fetchedCart)
      setCart(fetchedCart)
      // setCart(currentPage === '/orders/new' ? beatCart : fetchedCart);
      // setIsLoading(false);
    }
    fetchData();
  }, [id]);
  // console.log('CART', cart.beatItems[0].qty)
  // console.log('CART', cart.beatItems[0].id)
  // console.log('CARTPRICE', cart.beatItems[0].price)

  return (
    <div className="OrderDetail">
      {cart && cart.beatItems && cart.beatItems.length > 0 ? (
        cart.beatItems.map((item) => (
          <div key={item.id}>
            {/* Render the details of each item */}
            <p>Qty: {item.qty}</p>
            <p>ID: {item.id}</p>
            <p>Price: {item.price}</p>
          </div>
        ))
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
}

