import React, { useContext } from 'react'
import './cartitems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
const Cartitems = () => {
    const {all_product,cartItems,RemoveFromCart,getTotalCartAmount}=useContext(ShopContext);
    
      //✅ Checkout function
  const checkout = async () => {
    try {
      const response = await fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: all_product.filter((e) => cartItems[e.id] > 0).map((e) => ({
            id: e.id,
            name: e.name,
            image: e.image,
            new_price: e.new_price,
            quantity: cartItems[e.id],
          }))
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // 🔗 redirect user to Stripe checkout page
      }
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  };

  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
          <hr />
          {all_product.map((e) => {
              if (cartItems[e.id] > 0) {
                  return <div key={e.id}>
                      <div className="cartitems-format" >
                          <img src={e.image} className='carticon-product-icon' alt="" />
                          <p>{e.name}</p>
                          <p>${e.new_price}</p>
                          <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                          <p>{e.new_price * cartItems[e.id]}</p>
                          <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { RemoveFromCart(e.id) }} alt="" />
                      </div>
                      <hr />

                  </div>

              } return null
            })}
            <div className='cartitems-down'>
              <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                  <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr/>
                  <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                  </div>
                  <hr />
                  <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>${getTotalCartAmount()}</h3>
                  </div>
                </div>
                  <button onClick={checkout}>Proceed to Checkout</button> 
              </div>
            </div>
    </div>
 
  )
}

export default Cartitems
