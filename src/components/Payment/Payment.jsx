import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import { OrderContext } from '../context/Order/OrderContex'
import { BeatLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Payment() {
let{payCash , payOnline}=useContext(OrderContext)
const [paymentLoading , setpaymentLoading]=useState(false)
const [checkpayment , setcheckpayment]=useState(false)
const navigate = useNavigate()

  const initialValues={
    details:'',
    phone:'',
    city:'',
  }
  const validationSchema=Yup.object().shape({
    details:Yup.string().required("Required"),
    phone:Yup.string().matches(new RegExp ('^01[0125][0-9]{8}$'),'Invalid phone').required("Required"),
    city:Yup.string().required("Required"),

  })


  async function paymentWays(values){
    

  try {
    setpaymentLoading(true)
    if(checkpayment){
let data =await payOnline(values)
console.log(data)
window.location.href=data.session.url
    }else{
      let data =await payCash(values)
      
      navigate("/Allorders")
       toast("we are getting your order ready to be shipped" ,{theme:'dark', type:'success' , position:'bottom-right' ,autoClose: 3000,
          hideProgressBar: true,});
      
    }
  
 
  } 
  catch (error) {
    console.log(error)
    setpaymentLoading(false)
  }
  
    
    }

  const paymentFormik= useFormik({
    initialValues,
  validationSchema,
  onSubmit:paymentWays
   })
 


 
  return (

    <div className="container mx-auto flex-grow px-8 py-26 md:py-24">
<form onSubmit={paymentFormik.handleSubmit} className="mx-auto max-w-2xl px-8 py-14">
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={paymentFormik.handleBlur}  value={paymentFormik.values.details} onChange={paymentFormik.handleChange} type="text" name="details" id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
 {paymentFormik.errors.details && paymentFormik.touched.details ? <div class="flex items-center mt-2 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {paymentFormik.errors.details }
 
</div> : ''}
    

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={paymentFormik.handleBlur}   value={paymentFormik.values.phone} onChange={paymentFormik.handleChange} type="tel" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
    {paymentFormik.errors.phone && paymentFormik.touched.phone ? <div class="flex items-center mt-2 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {paymentFormik.errors.phone }
 
</div> : ''}
    

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={paymentFormik.handleBlur}  value={paymentFormik.values.city} onChange={paymentFormik.handleChange} type="text" name="city" id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
    {paymentFormik.errors.city && paymentFormik.touched.city ? <div class="flex items-center mt-2 p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {paymentFormik.errors.city }
 
</div> : ''}
    

  </div>

 <div>
  <div className="flex  items-center mb-4">
    <input onChange={()=>setcheckpayment(true)}  id="default-radio-1" type="radio" defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-radio-1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Online Payment </label>
  </div>
  <div className="flex items-center">
    <input  defaultChecked id="default-radio-2" type="radio" defaultValue name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cash Payment</label>
  </div>
</div>
<button type="submit" className="text-white inline-block w-full bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main mt-5">
{paymentLoading ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i> : <span>Payment</span> }
 
  
</button>
</form>

    </div>
  )
}
