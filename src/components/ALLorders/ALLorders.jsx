import  {  useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'

import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { Link } from 'react-router-dom'
export default function AlLorders() {
 
let[orderItems , setOrderItems]=useState([])

const {id} = jwtDecode( localStorage.getItem("getToken"));

   async function getUserOrder(id){
 let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
 setOrderItems(data)


 console.log(data)
 return data


   }


 
 useEffect(() => {
  getUserOrder(id)
 
  
 }, [])
 

  return (

    <div className='container mx-auto flex-grow px-8 py-26 md:py-24'>
      {orderItems? <>
        <h1 className=' text-main text-3xl my-10'>Order Details : </h1>
      {/* <div className='flex items-center justify-between bg-slate-200  gap-4 px-2 py-3'>

      </div> */}
<div className="relative overflow-x-auto my-7 ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
      <div className='flex items-center justify-between text-center  '>
      <th scope="col" className="py-3 ">
       image
        </th>
        <th scope="col" className="  py-3 ">
        id
        </th>
        <th scope="col" className=" py-3">
        isPaid
        </th>
        <th scope="col" className="  py-3">
        payment
        </th>
        <th scope="col" className=" py-3">
      Count
        </th>
        <th scope="col" className=" py-3">
        Price
        </th>
      </div>
        {/* <th scope="col" className="px-6 py-3">
        id
        </th>
        <th scope="col" className="px-6 py-3">
        isPaid
        </th>
        <th scope="col" className="px-6 py-3">
        paymentMethodType
        </th>
        <th scope="col" className="px-6 py-3">
        totalOrderPrice
        </th> */}
      </tr>
    </thead>
    <tbody>

    
{orderItems.map(order=>  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
 
        {order.cartItems.map((it)=>
         <div className='flex items-center justify-between '>
         <td className=" py-4 ">
        <img className='w-[40px] sm:w-[70px]' src={it.product.imageCover} alt="" />
        </td>
        <td scope="row" className=" py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
   {order. id}
        </td>
        <td className=" py-4">
        {order.isPaid ? 'paid' : 'Not paid'}
        </td>
        <td className=" py-4">
        {order.paymentMethodType}
        </td>
        <td className=" py-4">
        {it.count  }
        </td>
        <td className=" py-4">
        ${it.price  }
       
        </td>
       
    
         </div>




)
 }
      
      
        
        
      </tr>)}
      
     
    </tbody>
  </table>
 
</div>
<Link to={'/'} className='bg-main p-3 my-8 text-white text-xl rounded-md text-center dark:text-white     inline-block'>go back</Link>
      </> : ''}
      

    </div>
  )
}
