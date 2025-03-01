import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { useEffect } from 'react'
import axios from 'axios'
import ProductItems from '../../../shared/ProductItems/ProductItems'
import { Cartcontext } from '../../../context/Cart/Cartcontext'
import { toast } from 'react-toastify'
export default function RelatedProduct(props) {
  const [product , setProduct]=useState([])
  let {categoryId} = props
  let{addProductTocart ,loading}=useContext(Cartcontext)
 async function getProduct(){
 try {
  let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
 
 let res =data.data.filter(res=>res.category._id==categoryId)
 setProduct(res)
console.log(res)

 } catch (error) {
  console.log(error)
 }
  }
  useEffect(() => {
    getProduct()
   
     return () => {
      
     }
   }, [])
 async function addProduct(id){
    let data = await addProductTocart(id)
    console.log(data)
    if(data.status=="success"){
          toast(data.message ,{theme:'dark', type:'success' , position:'bottom-right'});
        
        }else{
          toast("error" ,{theme:'dark', type:'success' , position:'bottom-right'});
        }
  }
  return (

    <>
    <div className=" py-6  flex flex-wrap gap-y-3 mb-8 mt-4   ">
    
    {product.map((products)=> <ProductItems key={products.id} addProduct={addProduct}  products={products} />)}
    
    
     </div>
   
    </>
  )
}
