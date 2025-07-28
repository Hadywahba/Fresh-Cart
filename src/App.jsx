import { Suspense, useContext, useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import ProtectRoutes from './components/context/ProtectRoutes/ProtectRoutes'
import { Tokencontext } from './components/context/Tokencontext'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import Auth from './components/context/Auth/Auth'
import {  PulseLoader } from 'react-spinners'
import { lazy } from 'react'




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
const Home =lazy(()=>import('./components/Home/Home')) 
const Layout = lazy(()=>import('./components/Layout/Layout'))
const ChangePassword = lazy(()=>import('./components/ChangePassword/ChangePassword'))
const ResetPassword =lazy(()=>import('./components/ResetPassword/ResetPassword'))
const ForgetPassword =lazy(()=>import('./components/ForgetPassword/ForgetPassword'))
const Wishlist =lazy(()=>import('./components/Wishlist/Wishlist'))
const NotFound =lazy(()=>import('./components/NotFound/NotFound'))
const Cart =lazy(()=>import('./components/Cart/Cart'))
const Brands =lazy(()=>import('./components/Brands/Brands'))
const Categories =lazy(()=>import('./components/Categories/Categories'))
const AlLorders =lazy(()=>import('./components/ALLorders/ALLorders'))
const ProductDetails =lazy(()=>import('./components/ProductDetails/ProductDetails'))
const Products =lazy(()=>import('./components/Products/Products'))
const Payment =lazy(()=>import('./components/Payment/Payment'))





 const router= createBrowserRouter([
  {path: "" , element: <Suspense><Layout/></Suspense> , children :[
    {index : true , element: <Suspense><Home/></Suspense>},
    {path:'Categories' , element:<ProtectRoutes><Suspense><Categories/></Suspense></ProtectRoutes>},
    {path:'Cart' , element:<ProtectRoutes><Suspense><Cart/></Suspense></ProtectRoutes>},
    {path:'Brands' , element:<ProtectRoutes><Suspense><Brands/></Suspense></ProtectRoutes>},
    {path:'ProductDetails/:id/:categoryId' , element:<ProtectRoutes><Suspense><ProductDetails/></Suspense></ProtectRoutes>},
    {path:'Products' , element:<ProtectRoutes><Suspense><Products/></Suspense></ProtectRoutes>},
    {path:'Payment' , element:<ProtectRoutes><Suspense><Payment/></Suspense></ProtectRoutes>},
    {path:'Wishlist' , element:<ProtectRoutes><Suspense><Wishlist/></Suspense></ProtectRoutes>},
    {path:'allorders' , element:<ProtectRoutes><Suspense><AlLorders/></Suspense></ProtectRoutes>},
    {path:'ForgetPassword' , element:<Suspense><ForgetPassword/></Suspense>},
    {path:'ResetPassword' , element:<Suspense><ResetPassword/></Suspense>},
    {path:'ChangePassword' , element:<Suspense><ChangePassword/></Suspense>},
    {path:'Login' , element: <Auth><Login/></Auth>},
    {path:'Register' , element: <Auth> <Register/></Auth> },
    {path:'*' , element:<ProtectRoutes><Suspense><NotFound/></Suspense></ProtectRoutes>},
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


