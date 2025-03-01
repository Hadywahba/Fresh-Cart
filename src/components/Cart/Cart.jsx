import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { Cartcontext } from '../context/Cart/Cartcontext'
import gif1 from "../../assets/images/shopping-cart (1).gif"
import gif2 from "../../assets/images/shopping-cart.gif"
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart() {
let{productCart,cartCount,clearItems ,totalPrice ,removeProduct ,updateProduct}=useContext(Cartcontext)

async function deleteProduct(id){
 let data = await removeProduct(id)
 console.log(data)
}
async function updateItems(id , count){
  let data = await updateProduct(id , count)
  console.log(data)
 }

 async function clearAll(){
  let data = await clearItems()
  console.log(data)
 }
 




useEffect(() => {
 

 
}, [productCart])

  return (
    //totalCartPrice

   <>

<Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

            <div className='container mx-auto flex-grow px-8 py-26 md:py-24'> 

  {productCart?.data?.products.length==0 ? <div className='flex flex-col gap-5 items-center justify-center mb-10 text-center'>
    <img className='w-[200px] ' src={gif1} alt="" />
    <h1 className=' text-2xl sm:text-4xl text-center font-serif font-bold '>Your cart is Empty </h1>
 
  </div>
  
  
  : <div className='container py-12 sm:px-3 '>
  <h1 className=' text-2xl sm:text-4xl mb-1 text-main font-serif font-bold'>Shop Cart :</h1>
  <div className='flex flex-col gap-3 sm:flex sm:flex-row sm:justify-between  my-7'  >
    <h2 className='text-2xl  font-bold '>Total Cart Items : <span className='text-main'>{cartCount}</span></h2>
    <h2 className='text-2xl font-bold  '>Total Cart Price : <span className='text-main'>{productCart?.data?.totalCartPrice}</span> EGP</h2>
  </div>
  <button onClick={()=>clearAll()}  className=' bg-main w-full md:w-auto inline-block p-3 mb-6 rounded-md  text-white text-xl  opacity-85 '>Clear All</button>
   <div className="relative overflow-x-auto shadow-md sm:rounded-lg   ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>


      
      {productCart?.data?.products.map((product,id)=> <tr key={id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=> updateItems(product.product._id , product.count-1 )} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
           <span>{product.count}</span>
            </div>
            <button onClick={()=> updateItems(product.product._id , product.count+1 )}  className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ${product.price}
        </td>
        <td className="px-6 py-4">
          <span onClick={()=>deleteProduct(product.product._id)}  className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"><i class="fa-solid fa-trash-can text-2xl text-main"></i></span>
        </td>
      </tr>)}

     
 
     
    
    </tbody>
  </table>
 
</div>

<Link to={`/Payment`}  className=' bg-main w-full md:w-auto inline-block p-3 rounded-md my-3 text-white text-xl  opacity-85 '>Check out</Link>

    </div>
   }
   </div>
   </>
  )
}
