import React, { useEffect, useState } from "react";
import "../Css/Home.css";
import Search from "./Search";
import "../Css/Shops.css";
import SideNav from "./SideNav";
import MainContent from "./mainContent";
import { Navigate, Outlet } from "react-router-dom";
import Axios from "../Axios";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try {
      setLoading(true);
      const { data } = await Axios.get("/me");

      if (data.success) {
        setTimeout(() => {
          setLoading(false);
          setisAuthenticated(true);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setisAuthenticated(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return !isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="main">
      <Search />
      <div className="content-area">
        <Outlet />
      </div>
      <SideNav />
    </div>
  );
};

export default Home;
