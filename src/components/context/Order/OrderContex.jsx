import axios from "axios";
import { Children, createContext, useContext, useState } from "react";

export let OrderContext=createContext()
import React from 'react'
import { Cartcontext } from "../Cart/Cartcontext";
import { jwtDecode } from "jwt-decode";
export default function OrderContexProvider(props) {
let{cartId}=useContext(Cartcontext)

const headers={
    token:localStorage.getItem("getToken")
}

   async function payCash(shippingAddress){
    let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress},{headers})
    return data
    }

   async function payOnline(shippingAddress){
    let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{headers})
    return data
}
   

 



  

  return (
    <OrderContext.Provider value={{payCash,payOnline}}>
{props.children}
    </OrderContext.Provider>
  )
}
