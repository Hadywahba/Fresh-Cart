import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home/Home'
import Brands from './components/Brands/Brands'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Layout from './components/Layout/Layout'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import Navbar from './components/Navbar/Navbar'
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




export default function App() {

let {Token , setToken} = useContext(Tokencontext)

useEffect(() => {
 if (localStorage.getItem("getToken")){
  setToken(localStorage.getItem("getToken"))
 }
}, [])



 const router= createBrowserRouter([
  {path: "" , element: <Layout/> , children :[
    {index : true , element: <ProtectRoutes><Home/></ProtectRoutes>},
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

<RouterProvider router={router}/>
<ToastContainer/>
    </>
  )
}


