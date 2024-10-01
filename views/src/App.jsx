import React from "react";
import LogIn from "./components/LogIn";
import { Route, Router, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import MainContent from "./components/mainContent";
import ShopProduct from "./components/ShopProduct";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import AdminLogin from "./components/AdminLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<MainContent />} />
          <Route path="shopProducts" element={<ShopProduct />} />
          <Route path="singleProduct" element={<SingleProduct />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
};

export default App;
