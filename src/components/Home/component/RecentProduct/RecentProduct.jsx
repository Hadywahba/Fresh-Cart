import React, { useContext, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { useEffect } from 'react'
import axios from 'axios'
import ProductItems from '../../../shared/ProductItems/ProductItems'
import Loader from '../../../Loader/Loader'
import { Cartcontext } from '../../../context/Cart/Cartcontext'
import { toast } from 'react-toastify'
import { WishlistContext } from '../../../context/Wishlist/Wishlistcontext'
import Products from '../../../Products/Products'
import ReactPaginate from 'react-paginate'
import { Tokencontext } from '../../../context/Tokencontext'


export default function RecentProduct(props) {
  let [products, setproduct] = useState([])
  let [pages, setpages] = useState([])
  let [defaultpage, setdefaultpage] = useState(1)
  let [isload, setisload] = useState(false)
  let { addProductTocart } = useContext(Cartcontext)
  let [loadingProduct, setIsLoadingProduct] = useState(false)
  let { wishlist } = useContext(WishlistContext)
  let{Token}=useContext(Tokencontext)
  // console.log(wishlist)


  const handlePages = (info) => {
    setdefaultpage(info.selected + 1)
    setisload(true)
  }

  async function addProduct(id) {
    try {
      setIsLoadingProduct(true)
      let data = await addProductTocart(id)
      console.log(data.cartId)

      if (data.status == "success") {

        toast(data.message, { theme: 'dark', type: 'success', position: 'bottom-right' });
      } else {

        toast("error", { theme: 'dark', type: 'success', position: 'bottom-right' });
      }
    } catch (error) {
      console.log(data)
    }
    finally {
      setIsLoadingProduct(false)
    }


  }

  function getData() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`, {
      params: {
        limit: 25,
        page: defaultpage,

      }
    }).then(({ data }) => {

      setproduct(data.data)
      setpages(data.metadata.numberOfPages)

    }).catch(error => {
console.log(error)
    })
  }



  useEffect(() => {
    if(Token){
      getData()
    }
  


  }, [defaultpage])

  return (

    <>

      {products.length != 0 ?
       <div className=" pb-8  flex flex-wrap gap-y-3 mb-8 py-6">

        {products.map((products) =>

          <ProductItems key={products.id} addProduct={addProduct} loadingProduct={loadingProduct} products={products}


          />)}


      </div> : <Loader />}
      {products.length != 0 ? <ReactPaginate className='flex justify-center items-center my-6 text-xl sm:text-2xl gap-4 '

        previousLabel={<i class="fa-solid fa-backward"></i>}
        previousClassName='text-main'
        activeClassName='bg-main p-1 rounded-md'
        nextLabel={<i class="fa-solid fa-forward"></i>}
        nextClassName='text-main'
        pageCount={pages}
        forcePage={defaultpage - 1}
        onPageChange={handlePages}
      /> : ""}


    </>
  )
}
