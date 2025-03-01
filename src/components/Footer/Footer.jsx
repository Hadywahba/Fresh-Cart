import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import img1 from '../../assets/images/google-play-badge-DdS2zTTO.svg'
import img2 from '../../assets/images/download-on-the-app-store-CAFbHYsm.svg'
import img3 from '../../assets/images/amazon_card_cash_icon-B91Ydq-A.svg'
import img4 from '../../assets/images/amex-svgrepo-com-tP3OcVRO.svg'
import img5 from '../../assets/images/mastercard_payment_icon-iPPXQmKW.svg'
import style from './Footer.module.css'
import { useEffect } from 'react'
export default function Footer() {
 
  return (

    <>
  <footer className='bg-[rgb(242,242,248)]  mx-auto min-w-full border-t border-gray-200/60 px-6 pt-5 pb-6    '>
    <div className=" ">
    <h2 className=' text-lg sm:text-2xl text-[#212529]'>Get the FreshCart app</h2>
    <p className='text-[#6d767e] mb-4 '>We will send you a link,open it on your phone to download the app.</p>
    <div className=" flex flex-col  sm:flex-row  sm:gap-2 mb-5 ">
   <input className="bg-gray-50 border mb-4 sm:mb-0 grow border-gray-300 text-gray-900 text-sm rounded-lg  block p-2.5  dark:placeholder-gray-400" placeholder="Email..." required />

<button className=' py-2 sm:py-0 bg-main text-white rounded-md px-6'>Share App Link</button>
    </div>
    <div className=" pt-4 border-t-2  ">
   <div className='flex flex-col gap-3 text-center sm:flex sm:flex-row sm:justify-between sm:items-center '>
   
   <div className="   payment ">
        <h6>Payment Partners</h6>
     
      </div>
      <div className="paymentStore ">
        <h6>Get deliveries with FreshCart</h6>
        
      </div>
   </div >
    </div>
    <div className='border-b-2 sm:border-b-2 flex flex-col justify-center items-center  sm:flex sm:flex-row sm:justify-center sm:items-center'>
    <div className=' flex justify-center items-center gap-4  pt-4 '>
    <img className=' w-[50px] xl:w-[125px]' src={img2} alt="google app" />
    <img className='  w-[50px]  xl:w-[125px]' src={img1} alt="play store" />
    </div>
   <div className='flex justify-center items-center gap-4'>
   <img className='  w-[50px]  xl:w-[125px]' src={img3} alt="amazon store" />
    <img className='  w-[50px]  xl:w-[125px]' src={img4} alt="american" />
    <img className='  w-[50px]  xl:w-[125px]' src={img5} alt="master card" />
   </div>
    
    </div>
 
   
    <ul className='flex gap-6 justify-center pt-3 text-[30px]' >

  <li>
    <a className='insta'  href="https://www.instagram.com/">
      <i className=' fa-brands fa-instagram'></i>
    </a>
  </li>
  <li>
    <a className='facebook' href="https://www.facebook.com/">
      <i className=' fa-brands fa-facebook'></i>
    </a>
  </li>
  <li>
    <a className='tiktok' href="https://www.tiktok.com/">
      <i className=' fa-brands fa-tiktok'></i>
    </a>
  </li>
  <li>
    <a className='twitter' href="https://www.twitter.com/">
      <i className=' fa-brands fa-twitter'></i>
    </a>
  </li>
  <li>
    <a className='linkedin' href="https://www.linkedin.com/">
      <i className=' fa-brands fa-linkedin'></i>
    </a>
  </li>
  <li>
    <a className='youtube' href="https://www.youtube.com/">
      <i className=' fa-brands fa-youtube'></i>
    </a>
  </li>
</ul>
    </div>
   

  </footer>
    </>
  )
}
