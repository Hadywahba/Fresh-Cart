import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'
import RelatedProduct from './component/RelatedProduct/RelatedProduct'
import Slider from 'react-slick'
import { Cartcontext } from '../context/Cart/Cartcontext'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'
export default function ProductDetails() {
 let {id , categoryId} = useParams()
 let{addProductTocart}=useContext(Cartcontext)
 let[loading ,setloadingProduct]=useState(false)
 let[details , setDetails]=useState([])
 const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
 function getProductDetails(){
 
  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`).then(({data})=>{
  
    setDetails(data.data)
  }).catch(Error=>{
  
    console.log(Error)
  })
 }
 useEffect(() => {
  getProductDetails()
 
   return () => {
    
   }
 }, [id])
 

 async function addProduct(id){
  setloadingProduct(true)
   let data = await addProductTocart(id)
   setloadingProduct(false)
   console.log(data)
   if(data.status=="success"){
         toast(data.message ,{theme:'dark', type:'success' , position:'bottom-right'});
       
       }else{
        setloadingProduct(false)
         toast("error" ,{theme:'dark', type:'success' , position:'bottom-right'});
       }
 }
  return (

    <>
      <Helmet>
                <meta charSet="utf-8" />
                <title>{details?.title}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
    
  

    <div className=' container mx-auto flex-grow px-8 py-10 md:py-24'>
    {details.length==0 ? <Loader/> :
   <>
     <div className="  sm:justify-center gap-14  md:flex flex-wrap justify-center items-center pb-8  px-4 ">
<div className=" md:w-3/12    ">
<Slider {...settings}>
      {details.images.map(src => <img key={details.id} className='imgDetail'  src={src} alt="" />)}
      </Slider>


</div>
<div className="md:w-7/12 mt-10    ">
<h1 className='font-bold mb-1'>{details.title}</h1>
<p className='my-4 text-slate-500'>{details.description}</p>
<p className='mb-2 text-xl ' >{details.brand.name}</p>
<div className="flex justify-between mb-4">
          <span>{details.price} EGP</span>
          <span>
            <i className='fa-solid fa-star rating-color'></i>
            {details.ratingsAverage}</span>
        </div>
        <button onClick={()=>addProduct(details.id)} className=' bg-main w-full p-3 rounded-md my-3 font-bold text-neutral-50 opacity-85 btnStyle'>
          
          {loading ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i>:  <span> Add to Card</span>}
         
        
         </button>

</div>
    </div> 
 <div className='container mx-auto flex-grow px-8 '>
 
 <h2 className=' text-2xl sm:text-4xl font-bold my-7  py-12 text-main  px-3'>Related Product</h2>
 <RelatedProduct categoryId={categoryId}/>
 </div>
   </>
   
    }
   
    </div>
    </>
  )
}
