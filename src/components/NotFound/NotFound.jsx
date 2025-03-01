import React, { useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '../NotFound/NotFound.module.css'
import { useEffect } from 'react'
import NotFoundImage from '../../assets/images/error.svg'
export default function NotFound() {
 
  return (

    <>
    <div className="flex justify-center items-center container mx-auto flex-grow px-8 py-26 md:py-24 ">
      <img className='w-[50%] py-10' src={NotFoundImage} alt="NotFoundImage" />
    </div>
    </>
  )
}
