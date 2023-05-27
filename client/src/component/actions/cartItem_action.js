
import {ADD_TO_CART , GET_CART_ITEMS , REMOVE_CART_ITEM , REMOVE_CART_ITEMS} from "./types";


// Add to Cart
export const addToCart = (product)=>dispatch=>{

  let cartItems = [];
  if(localStorage.getItem('cart-item')){  

     cartItems = [...JSON.parse(localStorage.getItem('cart-item'))]
  }
   cartItems.push(product);
   const newItems = [...cartItems]
  localStorage.setItem('cart-item' , JSON.stringify([...newItems]))
  dispatch({
    type:ADD_TO_CART,
    payload:JSON.parse(localStorage.getItem('cart-item'))
  })
}

// GEt Item from cart
export const getCartItems = (getCartItem)=>dispatch=>{
  let cartItems = []
  if(localStorage.getItem('cart-item')){

    cartItems = JSON.parse(localStorage.getItem('cart-item'))
  }
  dispatch({
    type:GET_CART_ITEMS,
    payload:cartItems
  })
  if(getCartItem){

    getCartItem()
  }
}
// remove item from cart
export const removeCartItem = (product)=>dispatch=>{
  
  let cartItems = []
  if(localStorage.getItem('cart-item')){
     cartItems = JSON.parse(localStorage.getItem('cart-item'))

  }
  const removeItems =  cartItems.filter(cart => cart._id !== product._id );
  localStorage.setItem("cart-item" , JSON.stringify([...removeItems]))
  
  dispatch({
    type:REMOVE_CART_ITEM,
    payload:JSON.parse(localStorage.getItem('cart-item'))
  })
}

// empty Cart
export const emptyCart = ()=>dispatch=>{
  
  localStorage.setItem('cart-item' , JSON.stringify([]))
  dispatch({
    type:REMOVE_CART_ITEMS,
    payload:JSON.parse(localStorage.getItem('cart-item'))
  })
}