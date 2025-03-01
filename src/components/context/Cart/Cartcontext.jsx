import axios from "axios"
import { useEffect, useState } from "react"
import { createContext } from "react"
import { toast } from "react-toastify"

export let Cartcontext=createContext()
export default function CartcontextProvider(props) {
  let[cartCount , setCartCount]=useState(0)
  let[productCart,setProductCart]=useState([])
  let[totalPrice , setTotalPrice]=useState(0)
  let[isloading , setisloading]=useState(false)
  let[cartId , setcartId]=useState([])
const api_URL="https://ecommerce.routemisr.com/api/v1/cart"
const API_UPDATE = "https://ecommerce.routemisr.com/api/v1/cart/6428ebc6dc1175abc65ca0b9"
const headers={
  token : localStorage.getItem("getToken")
}

async function addProductTocart(productId){
  
 try {
  setisloading(true)
  let{data}=await axios.post(api_URL,{productId},{headers})
  setisloading(false)
  setCartCount(data.numOfCartItems)

  setTotalPrice(data.totalCartPrice)
  

  return data 
 
 } catch (error) {
  setisloading(false)
  console.log(error)
 }
}

async function getUserCart(){
  try {
    let {data}=await axios.get(api_URL,{headers})
    if(data.status=="success"){
      setProductCart(data)
      setcartId(data.cartId)
      setCartCount(data.numOfCartItems)
    setTotalPrice(data.totalCartPrice)
    }
    
    return data
  } catch (error) {
   
  }
}
 async function removeProduct(id){
try {
  let {data} = await axios.delete(`${api_URL}/${id}`,{headers})
  
  if(data.status=="success"){
    setProductCart(data)
    setCartCount(data.numOfCartItems)
  setTotalPrice(data.totalCartPrice)
  }
  return data ;
} catch (error) {
  console.log(error)
}

}


async function clearItems(){
  try {
    let {data} = await axios.delete(api_URL,{headers})
    
    if(data.status=="success"){
      setProductCart(data)
      setCartCount(data.numOfCartItems)
    setTotalPrice(data.totalCartPrice)
    }
    return data ;
  } catch (error) {
    console.log(error)
  }
  
  }
  


async function updateProduct(id , count){
  try {
    let {data} = await axios.put(`${api_URL}/${id}`,{count} , {headers})
    if(data.status=="success"){
    setProductCart(data)
    setCartCount(data.numOfCartItems)
    setTotalPrice(data.totalCartPrice)
    }
    return data ;
  } catch (error) {
    console.log(error)
  }
  }





useEffect(() => {
  
  getUserCart()

}, [getUserCart])


  return (
 <Cartcontext.Provider value={{addProductTocart ,removeProduct ,clearItems ,cartId ,cartCount,totalPrice ,productCart ,updateProduct ,isloading}}>
{props.children}
 </Cartcontext.Provider>
  )
}
//getToken