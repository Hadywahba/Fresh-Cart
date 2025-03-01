import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Register/Register.module.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Register() {

  const [isCallingApi , setCallingApi]=useState(false)
  const [ApiError , setApiError]=useState(null)
const navigate = useNavigate()


const initialValues={
  name : '',
  email : '',
  password : '',
  rePassword : '',
  phone : ''

}

 const formikRegister= useFormik({
initialValues,
validate : (values)=>{
 const errors={};
 if(!values.name){
  errors.name='Required'
 }
 else if (values.name.length < 3){
errors.name='min length 3'
 }
 else if (values.name.length >15){
  errors.name='max length 15 '
   }

   if(!values.email){
     errors.email='Required'
   }
   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
     errors.email='Invalid Email'
   }
   if(!values.password){
    errors.password='Required'
  }
  else if (!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)){
  errors.password='Invalid Password'
  }
  if(!values.rePassword){
    errors.rePassword='Required'
  }
  else if(values.password != values.rePassword){
      errors.rePassword=' rePassword should match Password '
  }
  if(!values.phone){
    errors.phone='Required'
  }
  else if (!/^01[0125][0-9]{8}$/.test(values.phone)){
      errors.phone='Invalid phone'
  }

  return errors


},
onSubmit : registerApi

 })


 async function registerApi(values){
 try {
  setCallingApi(true)
  setApiError(null)
  let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
  console.log(data)
  if(data.message=="success"){
        
        toast("Your Registration is successfully " ,{theme:'light', type:'success' , position:'top-center'});
      }else{
       
        toast("error" ,{theme:'light', type:'success' , position:'top-center'});
      }
  setCallingApi(false)
  navigate("/login")
 } catch (error) {
  setCallingApi(false)
  setApiError(error.response.data.message)
 }
 }
 
  return (

    <div className='container mx-auto flex-grow px-8 py-24 md:py-24'>
  

<form  onSubmit={formikRegister.handleSubmit} className="mx-auto max-w-2xl px-8 py-14">
  <h1 className='text-main text-3xl sm:text-5xl text-center font-semibold pt-6'>Register Now</h1>
  {ApiError ? <div class="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{ApiError}
</div> : ''}
  <div className="relative z-0 w-full my-2 group">
    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange}  value={formikRegister.values.name} type="text" name="name" id="floating_name" className="block py-2.5 px-0  w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserName</label>

  
   {
formikRegister.errors.name && formikRegister.touched.name ?   <div class="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.name}
</div> : ''
   }

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange}  value={formikRegister.values.email}  type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserEmail</label>

    {
formikRegister.errors.email && formikRegister.touched.email ?   <div class="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.email}
</div> : ''
   }

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange}  value={formikRegister.values.password}  type="password" name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserPassword</label>

    {
formikRegister.errors.password && formikRegister.touched.password ?   <div class="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.password}
</div> : ''
   }

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange}  value={formikRegister.values.rePassword}  type="password" name="rePassword" id="floatingrePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
    <label htmlFor="floating_rePassword" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">RePassword</label>

    {
formikRegister.errors.rePassword && formikRegister.touched.rePassword ?   <div class="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.rePassword}
</div> : ''
   }

  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange}  value={formikRegister.values.phone}  type="tel" name="phone" id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-main dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">UserPhone</label>

    {
formikRegister.errors.phone && formikRegister.touched.phone ?   <div class="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
{formikRegister.errors.phone}
</div> : ''
   }

</div>


{isCallingApi ? <div className='w-auto flex justify-end '>
<div className='bg-main p-1 rounded-md  '>
<BeatLoader  size={10} />
</div>
</div> :  <button type="submit" className="text-white block ms-auto bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button> }

</form>


    </div>
  )
}
// email
//hadywahba70@yahoo.com
//password
//Hady15799
