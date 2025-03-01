import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Navbar/Navbar.module.css'
import { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Products from '../Products/Products'
import Categories from '../Categories/Categories'
import Brands from '../Brands/Brands'
import logo from '../../assets/images/freshcart-logo.svg'
import { Tokencontext } from '../context/Tokencontext'
import { Cartcontext } from '../context/Cart/Cartcontext'


export default function Navbar() {
  let {Token , setToken}=useContext(Tokencontext)
  let navigate = useNavigate()
  let[openButton , setopenButton]=useState(false)
  let[closeButton , setcloseButton]=useState(true)
  let{cartCount}=useContext(Cartcontext)
  function changeSign(){
    localStorage.removeItem("getToken");
    setToken(null)
    navigate("/Login")
  }
  function goto(){
    navigate("/")
  }

  function gotoCart(){
    navigate('/Cart')
  }
  function gotoWishlist(){
    navigate('/Wishlist')
  }
  function toggleButton(){
    setopenButton(!openButton)
   
  }
  return (

    <>
    
    


 <nav className="bg-[rgb(242,242,248)]  dark:bg-gray-900  ">
  <div className="  container mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
   <div className="flex justify-center items-center gap-8 z-50 ">
   <a href="" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img onClick={goto} className=' w-[80px]  md:w-[150px]' src={logo} alt="" />
    </a>
    <div className= {` hidden w-full absolute md:block md:relative md:top-0 top-[56px]  left-0  md:w-auto`} id="navbar-default">
   {Token ?   
   <>
   <ul className={   ` font-xl  bg-[rgb(242,242,248)] md:flex flex-col text-center  items-center justify-center p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row  md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 ${openButton ? 'block' : 'hidden'} `}>
        <li className='pb-2'>
          <NavLink to={''} className="   text-gray-900   " aria-current="page">Home</NavLink>
        </li>
       
        <li className='pb-2'>
          <NavLink to={'Products'} className="   text-gray-900   ">Products</NavLink>
        </li>
        <li className='pb-2'>
          <NavLink to={'Categories'} className="   text-gray-900  ">Categories</NavLink>
        </li>
        <li className='pb-2'>
          <NavLink to={'Brands'} className="  text-gray-900    ">Brands</NavLink>
        </li>
       
      </ul> </>:''}
    </div>
   </div>



<ul className=' grow justify-end  flex gap-4 font-xl pe-3  '>
  {Token ? 
  
  <>
   <li>
          <span onClick={gotoWishlist}  className="block  text-gray-900    "><i class="fa-solid text-red-600 cursor-pointer text-lg fa-heart"></i></span>
        </li>
 
   <li>
   <span onClick={gotoCart}  className="block relative cursor-pointer  text-gray-900    " aria-current="page"><i class="fa-solid text-main fa-cart-shopping"></i>
{cartCount ==0 ? '' :  <div className="absolute inline-flex items-center  justify-center w-5 h-5 text-xs  text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">{cartCount}</div>}
 
   </span>
 </li>
 <li>
    <span onClick={changeSign} className='cursor-pointer'>Signout</span>
  </li>
 </>
  : <>
  <li>
   <NavLink to={'Login'}>Login</NavLink>
  </li>
  <li>
   <NavLink to={'Register'}>Register</NavLink>
  </li>
  
  </>}
 
  
</ul>








{Token ? <button onClick={toggleButton} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
  <span className="sr-only">Open main menu</span>
  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
  </svg>
</button> : ""} 

    
  </div>
</nav>





  
    </>
  )
}









