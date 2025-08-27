import { useContext, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import ProductItems from "../../../shared/ProductItems/ProductItems";
import Loader from "../../../Loader/Loader";
import { Cartcontext } from "../../../context/Cart/Cartcontext";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { useQuery } from "@tanstack/react-query";
export default function RecentProduct(props) {
  let [pages, setpages] = useState([]);
  let [defaultpage, setdefaultpage] = useState(1);
  let [isload, setisload] = useState(false);
  let { addProductTocart } = useContext(Cartcontext);
  let [loadingProduct, setIsLoadingProduct] = useState(false);

  const handlePages = (info) => {
    setdefaultpage(info.selected + 1);
    setisload(true);
  };

  async function addProduct(id) {
    setIsLoadingProduct(true);
    let data = await addProductTocart(id);
    console.log(data.cartId);

    if (data.status == "success") {
      toast(data.message, {
        theme: "dark",
        type: "success",
        position: "bottom-right",
      });
    } else {
      toast("error", {
        theme: "dark",
        type: "success",
        position: "bottom-right",
      });
    }
  }

  async function  getData() {
    const { data } =await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`,
      {
        params: {
          limit: 25,
          page: defaultpage,
        },
      }
    );

    setpages(data.metadata.numberOfPages);

    return data;
  }

  const { data } = useQuery({
    queryKey: ["Product", defaultpage],
    queryFn: getData,
    select: (data) => data?.data,
  });



  return (
    <>
      {data?.length != 0 ? (
        <div className=" pb-8  flex flex-wrap gap-y-3 mb-8 py-6">
          {data?.map((products) => (
            <ProductItems
              key={products.id}
              addProduct={addProduct}
              loadingProduct={loadingProduct}
              products={products}
            />
          ))}
        </div>
      ) : (
        <Loader />
      )}
      {data?.length != 0 ? (
        <ReactPaginate
          className="flex justify-center items-center my-6 text-xl sm:text-2xl gap-4 "
          previousLabel={<i className="fa-solid fa-backward"></i>}
          previousClassName="text-main"
          activeClassName="bg-main p-1 rounded-md"
          nextLabel={<i className="fa-solid fa-forward"></i>}
          nextClassName="text-main"
          pageCount={pages}
          forcePage={defaultpage - 1}
          onPageChange={handlePages}
        />
      ) : (
        ""
      )}
    </>
  );
}
