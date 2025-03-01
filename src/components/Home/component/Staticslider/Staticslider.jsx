import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from './Staticslider.module.css'
import { useEffect } from 'react'
import Slider1 from '../../../../assets/CategoriesProductImages/slider-image-1.jpeg'
import Slider2 from '../../../../assets/CategoriesProductImages/slider-image-2.jpeg'
import Slider3 from '../../../../assets/CategoriesProductImages/slider-image-3.jpeg'
import Slider4 from '../../../../assets/CategoriesProductImages/slider-2.jpeg'
import staticslider1 from '../../../../assets/CategoriesProductImages/grocery-banner.png'
import staticslider2 from '../../../../assets/CategoriesProductImages/grocery-banner-2.jpeg'
import Slider from 'react-slick'

export default function Staticslider() {
  const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed : 1000,
    
  };
  return (

   <div className="container px-5 py-8">
     <div className=' grid grid-cols-12 text-center '>
  <div className='  col-span-12 sm:col-span-8'>
  <Slider  {...settings} className='my-11 '>
<img src={Slider2} className='h-[400px] w-full'  alt="" />
<img src={Slider3} className='h-[400px] w-full' alt="" />
<img src={Slider4} className='h-[400px] w-full' alt="" />
      </Slider>

  </div>


  <div className=" col-span-12 sm:col-span-4 pt-11 ">
 
    <img src={staticslider1} className='h-[200px] w-full' alt="" />
    <img src={staticslider2} className='h-[200px] w-full' alt="" />
    
   

  </div>
    </div>
   </div>
  )
}
