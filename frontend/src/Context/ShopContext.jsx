import React, { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext(null);
import { useNavigate } from "react-router-dom";
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300+ 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product,setAll_Product]=useState([]);
    const [cartItems, setCartItem] = useState(getDefaultCart());
    useEffect(()=>{
        fetch('https://e-commerce-website-backend-8nct.onrender.com/allproducts')
        .then((respose)=>respose.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            
            fetch('https://e-commerce-website-backend-8nct.onrender.com/getcart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:"",
            }).then((respose)=>respose.json())
            .then((data)=>setCartItem(data));
        }
    },[])
   

    const addToCart=(itemId)=>{
        const navigate = useNavigate();
        if (!localStorage.getItem("auth-token")) {
    navigate("/login"); // ✅ should redirect
    return;
  }
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-website-backend-8nct.onrender.com/addtocart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                    
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((respose)=>respose.json())
            .then((data)=>console.log(data));
            
        }
        
    }

    const RemoveFromCart=(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
         if(localStorage.getItem('auth-token')){
            fetch('https://e-commerce-website-backend-8nct.onrender.com/removefromcart',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                    
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((respose)=>respose.json())
            .then((data)=>console.log(data));
    }
}
    const clearCart = () => {
    const emptyCart = getDefaultCart();
    setCartItem(emptyCart);

    if (localStorage.getItem("auth-token")) {
        fetch("https://e-commerce-website-backend-8nct.onrender.com/clearcart", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "auth-token": `${localStorage.getItem("auth-token")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}), // no body needed if backend clears everything
        })
        .then((res) => res.json())
        .then((data) => console.log("Cart cleared:", data))
        .catch((err) => console.error("Error clearing cart:", err));
    }
};
    
    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const  item in cartItems){
            if(cartItems[item]>0){
                let iteminfo=all_product.find((product)=>product.id===Number(item))
                totalAmount+=iteminfo.new_price*cartItems[item];
            }
        }
            return totalAmount;
    }

    const getTotalCartItems=()=>{
        let totalItems=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItems+=cartItems[item];
            }
        }
        return totalItems;
    }
     const contextValue = { all_product, cartItems ,addToCart,RemoveFromCart,getTotalCartAmount,getTotalCartItems,clearCart};
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
