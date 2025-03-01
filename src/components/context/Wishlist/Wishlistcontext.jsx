import { createContext, useContext, useEffect, useState } from "react";
export let WishlistContext=createContext()
import React from 'react'
import { Cartcontext } from "../Cart/Cartcontext";
import axios from "axios";

export default function WishlistContextProvider(props) {
  let[wishlist , setwishlist]=useState([])
const headers={
    token : localStorage.getItem("getToken")
  }

    // Get wishlist
  const getWishlist= async ()=>{
    try {
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {headers})
      setwishlist(data?.data || [])
      localStorage.setItem('wishlist' , JSON.stringify(data?.data || [] ))
    } catch (error) {
      
    }
  }
    // Add wishlist
   const addToWishlist= async(product)=>{
    try {
        let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId :product.id },{headers})
        let updateList=[...wishlist,product]
        setwishlist(updateList)
        localStorage.setItem('wishlist',JSON.stringify(updateList))
        return data
    } catch (error) {
      console.log(error)
    }
    }

    // remove wishlist
    const removeWishlist = async (productId)=>{
      try {
        let{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {headers})
        const filterWishlist = wishlist.filter((items)=> items.id !=productId )
        setwishlist(filterWishlist)
        localStorage.setItem('wishlist' , JSON.stringify(filterWishlist))
      } catch (error) {
        console.log(error)
      }
    }

     // Check about wishlist isin favourite

     function wishlistColor(productId){
     return wishlist.some((items)=>items.id == productId)
     }

  

useEffect(() => {
  const favheart = localStorage.getItem('wishlist')
  if(favheart){
    setwishlist(JSON.parse(favheart))
  }else{
    getWishlist()
  }
  
}, [])






  return (
    <WishlistContext.Provider value={{removeWishlist , addToWishlist , getWishlist ,wishlistColor , wishlist  }}>
{props.children}
    </WishlistContext.Provider>
  )
}
