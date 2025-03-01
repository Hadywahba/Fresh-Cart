import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
export default function ChangePassword() {
 let [loading , setloading]=useState(false)
  const [showPassword, setShowPassword] = useState(true);
 const navigate =useNavigate()
 const headers={
  token : localStorage.getItem("getToken")
}
   async function newPassword(values){
try {
  setloading(true)
  let{data}= await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values,{headers})
  console.log(data)
   toast('Password reset successfully' ,{theme:'dark', type:'success' , position:'top-center' ,autoClose: 3000,
        hideProgressBar: true,});
  navigate('/Login')
  setloading(false)
} catch (error) {
console.log(error)
  setloading(false)
  
}
   }
   
   const togglePassword = () => {
    setShowPassword(!showPassword);
  };

   const initialValues={
        email:'',
        newPassword:'',
      }
     
      const validationSchema=Yup.object().shape({
        email:Yup.string().email("Invalid Email").required("Required"),
        newPassword:Yup.string().matches(new RegExp ('^[A-Z][a-z0-9]{3,8}$'),'Invalid Password').required("Required")
      })
     const NewPasswordformik = useFormik({
        initialValues,
       onSubmit:newPassword,
        validationSchema,
      })
 
  return (

    <div className='container mx-auto flex-grow px-8 py-26 md:py-24'>
  <h1 className='text-center text-main text-3xl pt-16 mb-6'>Reset Your Password</h1>
    <form onSubmit={NewPasswordformik.handleSubmit} className="mx-auto max-w-2xl px-8 pb-4"> 
    <div className="relative z-0 w-full mb-8 group">
        <input onBlur={NewPasswordformik.handleBlur} onChange={NewPasswordformik.handleChange} value={NewPasswordformik.values.email} type="email" name="email" id="floating_email" className="block mb-4 py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder="  " required />
        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> Enter your Email </label>
        {NewPasswordformik.errors.email && NewPasswordformik.touched.email ?  <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
      <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
     {NewPasswordformik.errors.email }
     
    </div> : ''  }
    <div className="relative z-0 w-full mb-5 group">
    <input onBlur={NewPasswordformik.handleBlur} onChange={NewPasswordformik.handleChange} value={NewPasswordformik.values.newPassword} type={showPassword ? 'text' : 'password'} name="newPassword" id="floating_newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
  <div onClick={togglePassword}  className='absolute top-2 right-1'>
  {  showPassword ? <i class="fa-solid fa-eye"></i> : <i class="fa-solid fa-eye-slash"></i>}
  </div>
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">newPassword</label>
    {NewPasswordformik.errors.newPassword && NewPasswordformik.touched.newPassword ?  <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {NewPasswordformik.errors.newPassword }
 
</div> : ''  }


  </div>
    <div className='flex justify-center mt-8'>
    <button type="submit" className='bg-[#009966]  p-4 rounded-md text-white w-[60%] text-xl   '>
      {loading ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i> :   <p>Submit</p> }
     
     </button>
    </div>
    
    
       
    
    
      </div>
    </form>
    
    
        </div>
  )
}
