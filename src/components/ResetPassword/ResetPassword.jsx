import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function ResetPassword() {
 let [loading , setloading]=useState(false)
  const navigate =useNavigate()
  async function resetPassword(values){
    try {
      setloading(true)
      let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
      console.log(data)
      setloading(false)
      if(data.status=="Success"){
          toast('Success' ,{theme:'dark', type:'success' , position:'top-center' ,autoClose: 3000,
            hideProgressBar: true,});
         
        }else{
          toast("Error" ,{theme:'light', type:'default' , position:'top-center' ,});
         
        }
        navigate('/ChangePassword')
    } catch (error) {
      console.log(error)
      setloading(false)
    }
  }
 
const initialValues={
  resetCode:'',
     
    }
   
    const validationSchema=Yup.object().shape({
      resetCode:Yup.number().required("Required"),
   
    })
   const Resetformik = useFormik({
      initialValues,
  onSubmit:resetPassword ,
      validationSchema,
    })
 
  return (

    <>
     <div className='container mx-auto flex-grow px-8 py-26 md:py-24'>

<form onSubmit={Resetformik.handleSubmit} className="mx-auto max-w-2xl px-8 py-14"> 
<div className="relative z-0 w-full mb-5 group">
    <input onBlur={Resetformik.handleBlur} onChange={Resetformik.handleChange} value={Resetformik.values.resetCode} type="text" name="resetCode" id="floating_resetCode" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter your Code </label>
    {Resetformik.errors.resetCode && Resetformik.touched.resetCode ?  <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {Resetformik.errors.resetCode }
 
</div> : ''}



<div className='flex justify-center mt-8'>
<button type="submit" className='bg-[#009966]  p-4 rounded-md text-white w-[60%] text-xl   '>
  
{loading ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i> : <p> Submit</p>} 
 </button>
</div> 


  </div>
</form>


    </div>
   
    </>
  )
}


