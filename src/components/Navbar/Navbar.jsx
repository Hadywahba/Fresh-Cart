import  { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Tokencontext } from '../context/Tokencontext'
import { Cartcontext } from '../context/Cart/Cartcontext'
import { WishlistContext } from '../context/Wishlist/Wishlistcontext'


export default function Navbar({darkmode , togglemode}) {
  
  let {token , setToken}=useContext(Tokencontext)
  let navigate = useNavigate()
  let[openButton , setopenButton]=useState(false)
  // let[closeButton , setcloseButton]=useState(true)
  let{cartCount}=useContext(Cartcontext)
  let{WishlistCount}=useContext(WishlistContext)

  useEffect(() => {
    const saveDark = localStorage.getItem('theme')
    if(saveDark==='dark'){
      document.documentElement.classList.add("dark")
    }
  }, [])

 
  
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
    
    


 <nav className="bg-[rgb(242,242,248)]  dark:bg-gray-900 dark:text-white  ">
  <div className="  container mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between px-3 py-4">
   <div className="flex justify-center items-center gap-8 md:gap-24 z-50 ">
  
      <Link to={"/"} className='font-bold  text-xl sm:text-3xl hover:shadow-sm-light hover:shadow-main dark:hover:shadow-2xl dark:hover:shadow-main '>FreshCart</Link>
 
    <div className= {` ${openButton ? 'visible' : 'hidden'} md:block  w-full absolute  md:relative md:top-0 top-[56px]  left-0  md:w-auto`} >
   {token ?   
   <>
   <ul className={   ` font-xl  bg-[rgb(242,242,248)] dark:bg-gray-900 dark:md:bg-transparent  md:bg-transparent   md:flex flex-col text-center  items-center justify-center p-4 md:p-0 mt-4   rounded-lg  md:flex-row  md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0  `}>
        <li onClick={()=>setopenButton(false)} className='pb-2  '>
          <NavLink to={''} className="   text-gray-900 dark:text-white " aria-current="page">Home</NavLink>
        </li>
       
        <li onClick={()=>setopenButton(false)} className='pb-2'>
          <NavLink to={'Products'} className="   text-gray-900 dark:text-white    ">Products</NavLink>
        </li>
        <li onClick={()=>setopenButton(false)} className='pb-2'>
          <NavLink to={'Categories'} className="   text-gray-900 dark:text-white   ">Categories</NavLink>
        </li>
        <li onClick={()=>setopenButton(false)} className='pb-2'>
          <NavLink to={'Brands'} className="  text-gray-900 dark:text-white     ">Brands</NavLink>
        </li>
       
      </ul> </>:''}
    </div>
   </div>



<ul className=' grow justify-end  flex items-center gap-3 font-xl pe-3  '>
  {token ? 
  
  <>
   <li>
          <span onClick={gotoWishlist}  className="block relative cursor-pointer  text-gray-900    "><i className="fa-solid  dark:text-white  cursor-pointer text-lg fa-heart"></i>
          {WishlistCount ==0 ? '' :  <div className="absolute inline-flex items-center  justify-center w-5 h-5 text-xs  text-white  bg-main border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">{WishlistCount}</div>}
          </span>
        </li>
 
   <li>
   <span onClick={gotoCart}  className="block relative cursor-pointer  text-gray-900    " aria-current="page"><i className="fa-solid dark:text-white fa-cart-shopping"></i>
{cartCount ==0 ? '' :  <div className="absolute inline-flex items-center  justify-center w-5 h-5 text-xs  text-white bg-main border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">{cartCount}</div>}
 
   </span>
 </li>
 <button onClick={togglemode} >
  {darkmode ?  <i className="fa-solid fa-moon"></i> : <i  className="fa-solid fa-sun cursor-pointer"></i>  }
 </button>

 <li>
    <span onClick={changeSign} className='cursor-pointer'>Signout</span>
  </li>
 </>
  : <>
  <button onClick={togglemode} >
  {darkmode ?  <i className="fa-solid fa-moon"></i> : <i  className="fa-solid fa-sun cursor-pointer"></i>  }
 </button>
  <li>
   <NavLink to={'Login'}>Login</NavLink>
  </li>
  <li>
   <NavLink to={'Register'}>Register</NavLink>
  </li>
  
  </>}
 
  
</ul>








{token ? <button onClick={toggleButton}  type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" >
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









