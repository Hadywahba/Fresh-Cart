import  { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Link } from 'react-router-dom'
import { Cartcontext } from '../../context/Cart/Cartcontext'
import { WishlistContext } from '../../context/Wishlist/Wishlistcontext'
export default function ProductItems(props) {
  let { isloading } = useContext(Cartcontext)
  let { removeWishlist, addToWishlist, wishlistColor } = useContext(WishlistContext)
  let[currentProductId, setcurrentProductId]=useState('')
  let { title, price, ratingsAverage, category, imageCover, id , 
sold , quantity} = props.products



  const favourite = wishlistColor(id)
  return (
    <>
      <div className="md:w-1/2 lg:w-1/4 xl:w-1/6 px-3 relative ">
    
          <span className='bg-red-200 text-black absolute left-7 top-3 z-50 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-main  '>{quantity}</span>
        <button className='absolute right-7 top-3 text-xl z-50' onClick={() => favourite ? removeWishlist(id) : addToWishlist(props.products)}>
          <i className={`fa-solid fa-heart ${favourite ? 'text-red-600' : 'text-gray-900'} bg-violet-300 p-1`}></i>
        </button>
        <div className="product mb-8  ">
          <Link to={`/ProductDetails/${id}/${category._id}`}>
            <div className='relative'>
              <img className='w-full mb-2 ' src={imageCover} alt="" />

            </div>

            <p className='text-main text-balance'>{category.name}</p>
            <h2 className='font-bold mb-4 text-xl'>{title.split(' ').splice(1, 2).join(" ")}</h2>
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
