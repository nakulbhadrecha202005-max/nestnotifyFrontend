import React from "react";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Component/Home";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
