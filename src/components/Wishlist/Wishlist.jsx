import React, {  useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
 import heart from '../../assets/images/favourite.png'
import { Helmet } from 'react-helmet'
import { Cartcontext } from '../context/Cart/Cartcontext'
import { WishlistContext } from '../context/Wishlist/Wishlistcontext'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Wishlist() {
let{wishlist , wishlistColor ,removeWishlist ,addToWishlist}=useContext(WishlistContext)
 let[isload , setisload]=useState(false)
 let{addProductTocart}=useContext(Cartcontext)


     // ADD Product to cart
      async function addProduct(id){
   
         try {
           setisload(true)
           let data = await addProductTocart(id)
           setisload(false)
         console.log(data)
         if(data.status=="success"){
           
           toast(data.message ,{theme:'dark', type:'success' , position:'bottom-right'});
         }else{
          
           toast("error" ,{theme:'dark', type:'success' , position:'bottom-right'});
         }
         } catch (error) {
           setisload(false)
           console.log(data);
       
         }
        
       }
      


  return (

    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Wishlist</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>


            <div className='container mx-auto flex-grow px-8 py-26 sm:py-12'>
               
               {wishlist?.length!=0 ?   <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-24 pb-20 mt-44  md:mt-20 pt-50 px-4 md:px-0  ">
 {wishlist?.map((item=> {
  const favourite = wishlistColor(item.id)

  return( <div  key={item.id} className="product mb-8  ">

    <div className='relative'>
    <button className='absolute right-7 top-5 text-xl z-50' onClick={()=> favourite ? removeWishlist(item.id) : addToWishlist(item)} >
    <i class={`fa-solid fa-heart  ${favourite ?'text-red-800' :' text-gray-900'} bg-red-200 p-2`}></i>
     </button>
    <Link to={`/ProductDetails/${item.id}/${item.category._id}`}>
    <div className='relative'>
    <img className='w-full mb-2 ' src={item.imageCover} alt="" />
    
    </div>
    
        <p className='text-main'>{item.name}</p>
      <h2 className='font-bold mb-4 text-2xl'>{item.title.split(' ').splice(0,2).join(" ")}</h2>
      <div className="flex justify-between">
        <span>{item.price} EGP</span>
        <span>
          <i className='fa-solid fa-star rating-color'></i>
          {item.ratingsAverage}</span>
      </div>
      </Link>
     <button onClick={()=>{addProduct(item.id)  }}  className='btn bg-main w-full p-3 rounded-md my-3 font-bold text-neutral-50 opacity-85'>
      {isload ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i>  : <span>Add to Card</span>   }
     
      
    
      </button>
    
    </div>
    
    </div>)
 }
 
 

))}
 
</div> :<div className='text-center '>
  
  <div className='  rounded-md flex items-center justify-center flex-col'>
    <img className='w-[200px]' src={heart} alt="" />
    <h2 className='text-3xl'>No Favourites</h2>
    <h2>You can add an items to your Favourites by clicking to heart </h2>
    <Link to={`/`} className='bg-main mt-3 text-white text-xl mb-10 p-4 rounded-md'>go back</Link>
  </div>
  
  
  </div>}

               

            </div>
    </>
  )
}
