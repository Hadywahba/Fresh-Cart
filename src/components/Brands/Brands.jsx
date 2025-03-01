import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Brands/Brands.module.css'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import gif1 from "../../assets/images/shopping-cart (1).gif"
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../Store/store'
import { getBrands } from '../../Store/brandSlice'
import Loader from '../Loader/Loader'
export default function Brands() {


let[displayModal , setdisplayModal]=useState(false)
let[selectedBrand1 , setselectedBrand1]=useState([])
let[selectedBrand2 , setselectedBrand2]=useState([])
let[selectedBrand3 , setselectedBrand3]=useState([])
let dispatch = useDispatch()

  let {data ,isLoading } =useSelector((store=>store.brand))
 
useEffect(() => {
  dispatch(getBrands())

 
}, [])


function openModal(item1 , item2 , item3){
  setselectedBrand1(item1)
  setselectedBrand2(item2)
  setselectedBrand3(item3)
  setdisplayModal(true)
  console.log(item1)
}
function closeModal(){
  setdisplayModal(false)
}

  return (

    <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>






            <div className='container mx-auto flex-grow px-8 py-26 md:py-24'>
            <h1 className='text-center text-3xl  sm:text-4xl font-bold text-main my-10 pb-7'>All Brands</h1>
{isLoading ? <Loader/> : 

<div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-8'>
{data?.data.map((brands=>
   <div onClick={()=>openModal(brands.image ,brands.name , brands.slug)}  key={brands._id}  className=" border-2 border-gray-200 hover:scale-105 cart  ">
  <div  className=' flex flex-col items-center justify-center'>
  <div className='cart-img'>
 <img className='' src={brands.image} alt="" />
   </div>
   <div className='cart-body text-center w-full p-6'>
   <p className=' mb-3'>{brands.name}</p>
   </div>
  </div>
   </div>

))}



 </div>
}
</div>












{displayModal && <div className='bg-[rgba(0,0,0,0.5)] fixed inset-0 flex justify-center items-center '>
<div className='content bg-white py-12 px-6 w-[700px] '>
   <div  className=" border-t-2  ">
  <div  className=' flex items-center justify-between gap-5'>
  <div className='cart-body text-center w-full py-6'>
   <p className=' mb-3 text-main text-5xl'>{selectedBrand2}</p>
   <p className=' mb-3'>{selectedBrand3}</p>
   </div>
  <div className='cart-img'>
 <img className='w-full' src={selectedBrand1} alt="" />
   </div>
  </div>
   </div>
<div className='border-t-2 '>
<button type='button' onClick={()=>closeModal()} className='bg-main  w-full p-4 rounded-md my-5 right-0 '>Close</button>
</div>
</div>

</div>
}



    </>
  )
}
