import { useContext, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Layout from './components/Layout/Layout'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import ProtectRoutes from './components/context/ProtectRoutes/ProtectRoutes'
import { Tokencontext } from './components/context/Tokencontext'
import { useEffect } from 'react'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import Payment from './components/Payment/Payment'
import AlLorders from './components/ALLorders/ALLorders'
import Wishlist from './components/Wishlist/Wishlist'
import Auth from './components/context/Auth/Auth'
import ForgetPassword from './components/ForgetPassword/ForgetPassword'
import ResetPassword from './components/ResetPassword/ResetPassword'
import ChangePassword from './components/ChangePassword/ChangePassword'
import {  PulseLoader } from 'react-spinners'




export default function App() {

  const[isloading , setisloading]=useState(true)
let {Token , setToken} = useContext(Tokencontext)

// handling loading

useEffect(()=>{
 const time = setTimeout(()=>setisloading(false),2000)
  return()=>clearTimeout(time)
})

// handling loading

// handling token in refresh
useEffect(() => {
 if (localStorage.getItem("getToken")){
  setToken(localStorage.getItem("getToken"))
 }
}, [])

// handling token in refresh

 const router= createBrowserRouter([
  {path: "" , element: <Layout/> , children :[
    {index : true , element: <Home/>},
    {path:'Categories' , element:<ProtectRoutes><Categories/></ProtectRoutes>},
    {path:'Cart' , element:<ProtectRoutes><Cart/></ProtectRoutes>},
    {path:'Brands' , element:<ProtectRoutes><Brands/></ProtectRoutes>},
    {path:'ProductDetails/:id/:categoryId' , element:<ProtectRoutes><ProductDetails/></ProtectRoutes>},
    {path:'Products' , element:<ProtectRoutes><Products/></ProtectRoutes>},
    {path:'Payment' , element:<ProtectRoutes><Payment/></ProtectRoutes>},
    {path:'Wishlist' , element:<ProtectRoutes><Wishlist/></ProtectRoutes>},
    {path:'allorders' , element:<ProtectRoutes><AlLorders/></ProtectRoutes>},
    {path:'ForgetPassword' , element:<ForgetPassword/>},
    {path:'ResetPassword' , element:<ResetPassword/>},
    {path:'ChangePassword' , element:<ChangePassword/>},
    {path:'Login' , element: <Auth><Login/></Auth>},
    {path:'Register' , element: <Auth> <Register/></Auth> },
    {path:'*' , element:<ProtectRoutes><NotFound/></ProtectRoutes>},
  ]}
 ])

  return (
    <>
{isloading ? <>

 <div className="flex items-center justify-center h-screen bg-black">
      <PulseLoader color="#9675FA"  size={40} />
      </div>
</> : <>
<RouterProvider router={router}/>
<ToastContainer/>

</>}

    </>
  )
}


