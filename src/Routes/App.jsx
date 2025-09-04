import { Suspense, useContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login, Register } from "../Pages/Auth";
import ProtectRoutes from "../components/ProtectRoutes/ProtectRoutes";
import { Tokencontext } from "../components/context/Tokencontext";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Auth from "../components/context/Auth/Auth";
import { PulseLoader } from "react-spinners";
import { lazy } from "react";

export default function App() {
  const [isloading, setisloading] = useState(true);
  let { setToken } = useContext(Tokencontext);

  // handling loading

  useEffect(() => {
    const time = setTimeout(() => setisloading(false), 2000);
    return () => clearTimeout(time);
  });

  // handling loading

  // handling token in refresh
  useEffect(() => {
    if (localStorage.getItem("getToken")) {
      setToken(localStorage.getItem("getToken"));
    }
  }, []);

  // handling token in refresh
  const Home = lazy(() => import("../components/Home/Home"));
  const Layout = lazy(() => import("../Layout/Layout.jsx"));
  const ChangePassword = lazy(() =>
    import("../Pages/Auth").then((module) => ({
      default: module.ChangePassword,
    }))
  );
  const ResetPassword = lazy(() =>
    import("../Pages/Auth").then((module) => ({
      default: module.ResetPassword,
    }))
  );
  const ForgetPassword = lazy(() =>
    import("../Pages/Auth").then((module) => ({
      default: module.ForgetPassword,
    }))
  );

  const Wishlist = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.Wishlist }))
  );
  const NotFound = lazy(() => import("../Pages/NotFound/NotFound.jsx"));
  const Cart = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.Cart }))
  );
  const Brands = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.Brands }))
  );
  const Categories = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.Categories }))
  );
  const AlLorders = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.AlLorders }))
  );
  const ProductDetails = lazy(() =>
    import("../components/ProductDetails/ProductDetails")
  );
  const Products = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.Products }))
  );
  const Payment = lazy(() =>
    import("../Pages/Main").then((module) => ({ default: module.Payment }))
  );

  const router = createBrowserRouter([
    {
      path: "",
      element: (
        <Suspense>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "Categories",
          element: (
            <ProtectRoutes>
              <Suspense>
                <Categories />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "Cart",
          element: (
            <ProtectRoutes>
              <Suspense>
                <Cart />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "Brands",
          element: (
            <ProtectRoutes>
              <Suspense>
                <Brands />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "ProductDetails/:id/:categoryId",
          element: (
            <ProtectRoutes>
              <Suspense>
                <ProductDetails />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "Products",
          element: (
            <ProtectRoutes>
              <Suspense>
                <Products />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "Payment",
          element: (
            <ProtectRoutes>
              <Suspense>
                <Payment />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "Wishlist",
          element: (
            <ProtectRoutes>
              <Suspense>
                <Wishlist />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectRoutes>
              <Suspense>
                <AlLorders />
              </Suspense>
            </ProtectRoutes>
          ),
        },
        {
          path: "ForgetPassword",
          element: (
            <Suspense>
              <ForgetPassword />
            </Suspense>
          ),
        },
        {
          path: "ResetPassword",
          element: (
            <Suspense>
              <ResetPassword />
            </Suspense>
          ),
        },
        {
          path: "ChangePassword",
          element: (
            <Suspense>
              <ChangePassword />
            </Suspense>
          ),
        },
        {
          path: "Login",
          element: (
            <Auth>
              <Login />
            </Auth>
          ),
        },
        {
          path: "Register",
          element: (
            <Auth>
              {" "}
              <Register />
            </Auth>
          ),
        },
        {
          path: "*",
          element: (
            <ProtectRoutes>
              <Suspense>
                <NotFound />
              </Suspense>
            </ProtectRoutes>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      {isloading ? (
        <>
          <div className="flex items-center justify-center h-screen bg-black">
            <PulseLoader color="#9675FA" size={40} />
          </div>
        </>
      ) : (
        <>
          <RouterProvider router={router} />
          <ToastContainer />
        </>
      )}
    </>
  );
}
