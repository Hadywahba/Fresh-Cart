import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import style from "./Layout.module.css";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";
export default function Layout() {
  const [darkmode, setdarkmode] = useState(() => {
    return localStorage.getItem("theme") == "dark";
  });

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkmode]);
  return (
    <div className=" min-h-screen bg-white text-black dark:bg-black dark:text-white">
      <Navbar darkmode={darkmode} togglemode={() => setdarkmode(!darkmode)} />
      <Outlet />
      <Footer />
    </div>
  );
}
