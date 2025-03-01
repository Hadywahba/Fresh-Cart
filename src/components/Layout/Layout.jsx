import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Layout/Layout.module.css'
import { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {
 
  return (

    <div className='flex flex-col justify-between min-h-screen'>
  <Navbar/>
<Outlet/>
  <Footer/>

    </div>
  )
}
