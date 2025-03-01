import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../Home/Home.module.css'
import { useEffect } from 'react'
import RecentProduct from './component/RecentProduct/RecentProduct'
import CategoriesProduct from './component/CategoriesProduct/CategoriesProduct'
import Staticslider from './component/Staticslider/Staticslider'
import { Helmet } from 'react-helmet'
export default function Home() {
 
  return (
    
<>
<Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>



    <div className='container mx-auto flex-grow px-8 py-26 md:py-24'>
      <Staticslider/>
      <CategoriesProduct />
<RecentProduct/>
    </div>
    </>
  )
}
