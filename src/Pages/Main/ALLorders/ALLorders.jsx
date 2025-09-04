import { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

export default function AlLorders() {
  let [orderItems, setOrderItems] = useState([]);

  const { id } = jwtDecode(localStorage.getItem("getToken"));

  async function getUserOrder(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
    setOrderItems(data);
    console.log(data);
    return data;
  }

  useEffect(() => {
    getUserOrder(id);
  }, [id]);

  return (
    <div className="container mx-auto flex-grow px-8 py-26 md:py-24">
      {orderItems.length > 0 ? (
        <>
          <h1 className="text-main text-3xl my-10">Order Details :</h1>

          <div className="  gap-8 items-start justify-center grid grid-cols-12 ">
            {/* User Info Section */}

            {/* Table Section */}
            <div className=" overflow-x-auto  relative col-span-12 md:col-span-7 order-2 md:order-1 ">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3">
                      Image
                    </th>
                    <th scope="col" className="py-3">
                      ID
                    </th>
                    <th scope="col" className="py-3">
                      Is Paid
                    </th>
                    <th scope="col" className="py-3">
                      Payment
                    </th>
                    <th scope="col" className="py-3">
                      Count
                    </th>
                    <th scope="col" className="py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems.map((order) =>
                    order.cartItems.map((it, index) => (
                      <tr
                        key={`${order.id}-${index}`}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      >
                        <td className="py-4">
                          <img
                            className="w-[40px] sm:w-[70px]"
                            src={it.product.imageCover}
                            alt=""
                          />
                        </td>
                        <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {order.id}
                        </td>
                        <td className="py-4">
                          {order.isPaid ? "Paid" : "Not paid"}
                        </td>
                        <td className="py-4">{order.paymentMethodType}</td>
                        <td className="py-4">{it.count}</td>
                        <td className="py-4">${it.price}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-span-12 md:col-span-5 order-1 md:order-2 ">
              <div className="  md:text-sm xl:text-lg dark:text-white text-black flex-col justify-center items-center  bg-gray-100 dark:bg-gray-700     h-auto rounded-md p-8    ">
                <div className="  pb-3 border-b-2 dark:border-gray-500 border-gray-200 space-y-2">
                  <p>Name: {orderItems[orderItems.length - 1]?.user?.name}</p>
                  <p className=" ">
                    Email: {orderItems[orderItems.length - 1]?.user?.email}
                  </p>
                  <p>Phone: {orderItems[orderItems.length - 1]?.user?.phone}</p>
                  <p>
                    City:{" "}
                    {orderItems[orderItems.length - 1]?.shippingAddress?.city}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="pt-3">
                    TotalOrderPrice:
                    {orderItems[orderItems.length - 1]?.totalOrderPrice}EGP
                  </p>
                  <p className="">
                    TaxPrice:{orderItems[orderItems.length - 1]?.taxPrice}EGP
                  </p>
                  <p className="">
                    ShippingPrice:
                    {orderItems[orderItems.length - 1]?.shippingPrice}EGP
                  </p>
                  <p className="">
                    PaymentMethodType:
                    {orderItems[orderItems.length - 1]?.paymentMethodType}
                  </p>
                  <p className="">
                    Date:
                    {orderItems[orderItems.length - 1]?.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Link
            to={"/"}
            className="bg-main p-3 my-8 text-white text-xl rounded-md text-center dark:text-white inline-block"
          >
            Go Back
          </Link>
        </>
      ) : (
        <p className="text-center text-lg text-gray-600">No orders found.</p>
      )}
    </div>
  );
}
