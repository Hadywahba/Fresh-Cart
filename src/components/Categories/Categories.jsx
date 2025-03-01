import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../Store/store'
import { getCategory } from '../../Store/categorySlice'
import CategoriesItems from './CategoriesItems'

import axios from 'axios'
import SubCategory from './SubCategory'
import Loader from '../Loader/Loader'


export default function Categories() {
 let {categorys ,isloadin } =  useSelector((store=>store.category))
 let[loader , setloader]=useState(false)
 let[subCategoryData , setsubCategoryData]=useState([])
 let[SpecificsubCategoryData , setSpecificsubCategoryData]=useState([])
 let[show , setShow]=useState(false)
let dispatch = useDispatch()

useEffect(() => {
 
 dispatch(getCategory())
 
}, [])


async function getSubcategory(id){
  try {
    setloader(true)
    let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`)
    setloader(false)
    setsubCategoryData(data.data)
    console.log(data.data)
   return data
  
  } catch (error) {
    console.log(error)
    setloader(false)
  }
      }


      // const sub_API=`https://ecommerce.routemisr.com/api/v1/subcategories`
      // const params={
      //  limit : 10 ,
      // }
      // async function getAllSubCategory(){
      //   try {
      //     let{data}=await axios.get(sub_API )
      //     console.log(data.data)
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
      // useEffect(() => {
       
      //   getAllSubCategory()
      //   return () => {
         
      //   }
      // }, [])


     
      // async function getSpecificSubCategory(id){
      //   try {
      //     let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`)
        
      //   } catch (error) {
      //     console.log(error)
      //   }
      // }
    


  return (

    <>
    
   
<Helmet>
                <meta charSet="utf-8" />
                <title>Categories</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>

<div className='container mx-auto flex-grow px-8 py-26 md:py-24'>
  {isloadin ? <Loader/> : <div className='category-Cart grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 my-16 px-4 md:px-0'>

{categorys?.data?.map(((category)=> <div  onClick={()=>{getSubcategory(category._id , ) ; setSpecificsubCategoryData(category.name ) ; setShow(true) } } className=' flex justify-center items-center flex-col border-3 Category-cart rounded-md '>
     <div className='Categorycart-img'>
       <img className='w-screen h-[400px]'  src={category.image} alt="" />
     </div>
<div className='cart-body bg-white p-4'>
<h3 className=' text-center text-main text-2xl sm:text-4xl font-bold '>{category.name}</h3>
</div> 

   </div>))}
 
         
 </div>}

 
  
 <div>
 </div>
  {loader? <Loader/> : <>
    {show ?  <h1 className='text-center text-main text-2xl sm:text-4xl  md:px-0'> {SpecificsubCategoryData} subcategories</h1> : ''}  
 
 <div className='subCategory-cart mb-20 pt-6 px-4 md:px-0'>
 
 <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-5 mt-7 '>
   {subCategoryData?.map((subCateg=> 
   <div className='border-2   rounded-md p-4'>
 <h1 className='text-center font-semibold text-xl sm:text-3xl'>{subCateg.name}</h1>
   </div> 
  
   
   ))}
 
 </div> 
   
   
 
         
         
    
     
     </div>
  
  </>}
  
  </div>
    
    
    </>

  )
}

