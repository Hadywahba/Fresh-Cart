import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Products/Products.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Cartcontext } from '../context/Cart/Cartcontext'
import { useFormikContext } from 'formik'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
import ReactPaginate from 'react-paginate'
import { WishlistContext } from '../context/Wishlist/Wishlistcontext'
import { Helmet } from 'react-helmet'
export default function Products() {
 let[product , setproduct]=useState([])
 let[pages , setpages]=useState([])
 let[searchData , setsearchData]=useState([])
 let[defaultpage , setdefaultpage]=useState(1)
 let[isload , setisload]=useState(false)
 let[isloaded , setisloaded]=useState(false)
 let[sort , setsort]=useState('title')
 let[searchVlalue , setsearchVlalue] =useState('')
  let{addProductTocart }=useContext(Cartcontext)
 let {removeWishlist , addToWishlist  ,wishlistColor , wishlist } = useContext(WishlistContext)
  // ADD Product to cart
  // console.log(wishlist)
   async function addProduct(id){

      try {
        setisload(true)
        let data = await addProductTocart(id)
        setisload(false)
     
      if(data.status=="success"){
        
        toast(data.message ,{theme:'dark', type:'success' , position:'bottom-right'});
      }else{
       
        toast("error" ,{theme:'dark', type:'success' , position:'bottom-right'});
      }
      } catch (error) {
        setisload(false)
      
    
      }
     
    }
   
  

  // GET Product 
 async function getProduct(){
      try {
     
        setisloaded(true)
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products` , {
          params :{
      
        
            sort
          }
          
         
        })
        let res=data.data.filter((items)=> {return items.category.name.toLowerCase().includes(searchVlalue.toLowerCase())} )
        console.log(res)
       
     
    
        console.log(data.data);
        setproduct(res)
      } catch (error) {
        console.log(error)
      }
  }
  const handleinput=(e)=>{
    setsearchVlalue(e.target.value)
    // getProduct()
    console.log(e.target.value)
  }
  const handleSort=(e)=>{

  setsort(e.target.value)
  getProduct()
  }

  useEffect(() => {
   
    getProduct()
    
  }, [ sort , searchVlalue])
  


  return (
   <>
    <Helmet>
                <meta charSet="utf-8" />
                <title>Product</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
  
    <div className='container mx-auto flex-grow px-8 py-10'>

   <div className='top-page mt-24 grid grid-cols-12 mb-8  '>

<div className='col-span-12 w-full px-4 sm:w-[50%]   m-auto'>

<form class=" mx-auto">   
  <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
  <div class="relative">
      <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
      </div>
      <input value={searchVlalue}  onInput={handleinput}  type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-main focus:border-main dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-main dark:focus:border-main" placeholder="Search your products ..." required />
      {/* <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-main dark:hover:bg-main dark:focus:ring-main">Search</button> */}
  </div>
</form>

</div>

</div> 
  
<div className='flex justify-center px-3 items-center md:flex md:justify-end md:items-center gap-3'>
<label htmlFor="productSelector"><i class="fa-solid fa-filter text-3xl text-main "></i></label>
<select onChange={handleSort} defaultValue={sort} className='border-main p-2 rounded-md' name="" id="productSelector ">
  <option value="-price">Price High to Low</option>
  <option value="price">Price Low to High</option>
  <option value="-ratingsAverage">Top Rated</option>
  <option value="title">Name A to Z</option>
  <option value="-title">Name Z to A</option>
</select>
</div>

  {product.length!=0 ?   <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6  gap-9  mt-5 px-4  ">
 {product?.map((product=> {
  const favourite = wishlistColor(product.id)

  return( <div  key={product.id} className="product mb-8  ">

    <div className='relative'>
    <button className='absolute right-7 top-5 text-xl z-50' onClick={()=> favourite ? removeWishlist(product.id) : addToWishlist(product)} >
    <i class={`fa-solid fa-heart ${favourite ?'text-red-800' :' text-gray-900'} bg-red-200 p-2`}></i>
     </button>
    <Link to={`/ProductDetails/${product.id}/${product.category._id}`}>
    <div className='relative'>
    <img className='w-full mb-2 ' src={product.imageCover} alt="" />
    
    </div>
    
        <p className='text-main'>{product.name}</p>
      <h2 className='font-bold mb-4 text-2xl'>{product.title.split(' ').splice(0,2).join(" ")}</h2>
      <div className="flex justify-between">
        <span>{product.price} EGP</span>
        <span>
          <i className='fa-solid fa-star rating-color'></i>
          {product.ratingsAverage}</span>
      </div>
      </Link>
     <button onClick={()=>{addProduct(product.id)  }}  className='btn bg-main w-full p-3 rounded-md my-3 font-bold text-neutral-50 opacity-85'>
      {isload ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i>  : <span>Add to Card</span>   }
     
      
    
      </button>
    
    </div>
    
    </div>)
 }
 
 

))}
 
</div> :<Loader/>}


    </div>
    </>
  )
 
}
