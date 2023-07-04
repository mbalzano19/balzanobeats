import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import BeatItem from "../BeatItem/BeatItem";
import * as ordersAPI from '../../utilities/orders-api';
import * as beatsAPI from '../../utilities/beats-api';
import './OrderDetail.css'

export default function OrderDetail({beat, handleChangeQty, handleCheckout}) {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [cartPrice, setCartPrice] = useState(0);
  // if (!order) return null;
  // console.log('ORDER', order)
  // console.log('beatORDERORDOEOR', beats)
  console.log('beatORDERORDOEOR', beat)
  

  useEffect(() => {
    async function fetchData() {
      const beats = await beatsAPI.getAll(id);
      const beatCart = beats.find((beat) => beat._id === id);
      const fetchedCart = await ordersAPI.getCart()

      console.log('FETCHEDCART ORDER DETAIL', fetchedCart)
      setCart(fetchedCart)
      calculateCartPrice(fetchedCart);
      // setCart(currentPage === '/orders/new' ? beatCart : fetchedCart);
      // setIsLoading(false);
    }
    fetchData();
  }, [id]);

  function calculateCartPrice(cart) {
    if (cart && cart.beatItems) {
      let totalPrice = 0;
      for (const item of cart.beatItems) {
        totalPrice += item.qty * item.beat.price;
      }
      setCartPrice(totalPrice);
    }
  }

  function handleClientChangeQtyMinus(cartId, itemId, itemQty, itemPrice) {
    handleChangeQty(cartId, itemId, itemQty);
  
    const copyCart = cart.beatItems.map((item) => ({ ...item }));
    const foundBeatItemIndex = copyCart.findIndex((item) => item._id === itemId);
    copyCart[foundBeatItemIndex].qty -= 1;

    if (copyCart[foundBeatItemIndex].qty === 0) {
      copyCart.splice(foundBeatItemIndex, 1);
    }
  
    const finalCart = { ...cart, beatItems: copyCart };
    setCart(finalCart);


    calculateCartPrice(finalCart)

    

    // setCartPrice(updatedPrice)
  }
  
  function handleClientChangeQtyPlus(cartId, itemId, itemQty, itemPrice) {
    handleChangeQty(cartId, itemId, itemQty);
  
    const copyCart = cart.beatItems.map((item) => ({ ...item }));
    const foundBeatItemIndex = copyCart.findIndex((item) => item._id === itemId);
    copyCart[foundBeatItemIndex].qty += 1;
  
    const finalCart = { ...cart, beatItems: copyCart };
    setCart(finalCart);

    const updatedItem = finalCart.beatItems[foundBeatItemIndex]
    const updatedPrice = updatedItem.qty * itemPrice
    const totalPrice = cartPrice

    // setCartPrice(updatedPrice)
    calculateCartPrice(finalCart)
  }


  // console.log('CART', cart.beatItems[0].qty)
  // console.log('CART', cart.beatItems[0].id)
  // console.log('CARTPRICE', cart.beatItems[0].price)

  // console.log('cart right before orderDetail return', cart.isPaid)
  console.log('cart right before orderDetail return', cart)
  return (
    <>
      <h1 className="cartheader">Cart</h1>
      <div className="ordercontainer">
        <div className="OrderDetail shadow-sm p-3 mb-5 bg-dark">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th>Beat:</th>
                {/* <th>Licenses:</th> */}
                <th>Update Licenses:</th>
                <th>Price:</th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.beatItems && cart.beatItems.length > 0 ? (
                cart.beatItems.map((item) => (
                  <tr key={item.id}>
                    {/* Render the details of each item */}
                    <td>
                      <p className="beatName">{item.beat.name}</p>
                    </td>
                    {/* <td>
                      <p>{item.qty}</p>
                    </td> */}

                    <td>
                      <div
                        className="qty"
                        style={{ justifyContent: cart.isPaid && 'center' }}
                      >
                        {!cart.isPaid && (
                          <button
                            className="btn-xs"
                            onClick={() =>
                              handleClientChangeQtyMinus(
                                cart._id,
                                item._id,
                                item.qty - 1,
                                item.beat.price
                              )
                            }
                          >
                            −
                          </button>
                        )}
                        <span>{item.qty}</span>
                        {!cart.isPaid && (
                          <button
                            className="btn-xs"
                            onClick={() =>
                              handleClientChangeQtyPlus(
                                cart._id,
                                item._id,
                                item.qty + 1,
                                item.beat.price
                              )
                            }
                          >
                            +
                          </button>
                        )}
                      </div>
                    </td>
                    <td>
                      <p>${item.qty * item.beat.price.toFixed(2)}.00</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No items in the cart.</td>
                </tr>
              )}
            <tr>
              <td colSpan="2" style={{ textAlign: 'right' }}>Order Total:</td>
              <td style={{ textAlign: 'center' }}>${cartPrice.toFixed(2)}</td>
            </tr>
            <button>Checkout</button>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

