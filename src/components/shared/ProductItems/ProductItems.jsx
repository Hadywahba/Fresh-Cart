import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../../context/Cart/Cartcontext'
import Products from '../../Products/Products'
import { WishlistContext } from '../../context/Wishlist/Wishlistcontext'
export default function ProductItems(props) {
  let { addProduct, isloading } = useContext(Cartcontext)
  let { removeWishlist, addToWishlist, wishlistColor } = useContext(WishlistContext)
  let { loadingProduct } = props
  let[currentProductId, setcurrentProductId]=useState('')
  let { title, price, ratingsAverage, category, imageCover, id } = props.products



  const favourite = wishlistColor(id)
  return (
    <>
      <div className="md:w-1/2 lg:w-1/4 xl:w-1/6 px-3 relative ">
        <button className='absolute right-7 top-3 text-xl z-50' onClick={() => favourite ? removeWishlist(id) : addToWishlist(props.products)}>
          <i class={`fa-solid fa-heart ${favourite ? 'text-red-700' : 'text-gray-900'} bg-red-200 p-2`}></i>
        </button>
        <div className="product mb-8  ">
          <Link to={`/ProductDetails/${id}/${category._id}`}>
            <div className='relative'>
              <img className='w-full mb-2 ' src={imageCover} alt="" />

            </div>

            <p className='text-main'>{category.name}</p>
            <h2 className='font-bold mb-4 text-2xl'>{title.split(' ').splice(0, 2).join(" ")}</h2>
            <div className="flex justify-between">
              <span>{price} EGP</span>
              <span>
                <i className='fa-solid fa-star rating-color'></i>
                {ratingsAverage}</span>
            </div>
          </Link>
          <button onClick={() => { 
            props.addProduct(id);
            setcurrentProductId(id);
           }} className='btn bg-main w-full p-3 rounded-md my-3 font-bold text-neutral-50 opacity-85'>

            {isloading && id==currentProductId ? <i className='fa-solid fa-spinner fa-spin text-center text-white'></i> : <span>Add to Card</span>}


          </button>
        </div>
      </div>

    </>
  )
}
