import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Login/Login.module.css'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { BeatLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router-dom'
import { Tokencontext } from '../context/Tokencontext'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
export default function Login() {
  let [loginApiCall , setLoginApi]=useState(false)

  const [showPassword, setShowPassword] = useState(true);

  let [loginError,setloginError]=useState(null)


  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  // const maskedPassword = showPassword ? password : '*'.repeat(password.length);
  
  const {setToken}=useContext(Tokencontext)
const navigate =useNavigate()
  const initialValues={
    email:'',
    password:'',
  }
 
  const validationSchema=Yup.object().shape({
    email:Yup.string().email("Invalid Email").required("Required"),
    password:Yup.string().matches(new RegExp ('^[A-Z][a-z0-9]{3,8}$'),'Invalid Password').required("Required")
  })
  const loginformik = useFormik({
    initialValues,
    onSubmit:loginApi,
    validationSchema,
  })


 async function loginApi(values){
try {
  setLoginApi(true)
  let{data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values) 
  localStorage.setItem("getToken",data.token )
  setToken(data.token)
console.log(data.token)
if(data.message=="success"){
  toast("Welcome" ,{theme:'dark', type:'success' , position:'top-center' ,autoClose: 3000,
    hideProgressBar: true,});
 
}else{
  toast("Error" ,{theme:'light', type:'default' , position:'top-center' ,});
 
}
navigate('/')

  
setLoginApi(false)
} catch (error) {
  setLoginApi(false)
  setloginError(error.response.data.message)
}
  }
 
  return (

    <div className='container mx-auto flex-grow px-2 py-24 md:py-24'>


<form onSubmit={loginformik.handleSubmit} className=" mx-auto max-w-2xl px-8 py-14">
  <h1 className='text-main text-3xl  sm:text-5xl text-center font-semibold py-5'>Login Now</h1>

  {loginError ?  <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg> {loginError} </div> : ''}
 
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={loginformik.handleBlur} onChange={loginformik.handleChange} value={loginformik.values.email} type="email" name="email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

{loginformik.errors.email && loginformik.touched.email ?  <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {loginformik.errors.email }
 
</div> : ''  }


   


  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input onBlur={loginformik.handleBlur} onChange={loginformik.handleChange} value={loginformik.values.password} type={showPassword ? 'text' : 'password'} name="password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
  <div onClick={togglePassword} className='absolute top-2 right-1'>
{  showPassword ? <i class="fa-solid fa-eye"></i> : <i class="fa-solid fa-eye-slash"></i>}
  </div>
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
    {loginformik.errors.password && loginformik.touched.password ?  <div class="flex items-center p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
 {loginformik.errors.password }
 
</div> : ''  }


  </div>

  {loginApiCall ? <div className="w-auto flex justify-end ">
  <div className="bg-main p-1 rounded-md">
  <BeatLoader size={10} />
  </div>
</div> :
 <div className='flex justify-center items-center gap-3'>

<Link to={'/ForgetPassword'}><p className='text-main text-lg  sm:text-xl'>forget your password ?</p></Link>
<button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none  ms-auto inline-block  focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Login</button>





 </div>
  
  }

 
</form>






    </div>
  )
}
//"hadywahba25@yahoo.com"
//Hady15799
