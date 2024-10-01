import React, { useEffect, useState } from "react";
import Advertisement from "./Advertisement";
import Shops from "./Shops";
import { link } from "framer-motion/client";
import "../Css/Home.css";
import Axios from "../Axios";
import { useNavigate } from "react-router-dom";
const mainContent = () => {
  const navigate = useNavigate();
  const [ads, setads] = useState([
    {
      url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg",
      link: "",
    },
    {
      url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg",
      link: "",
    },
    {
      url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg",
      link: "",
    },
  ]);
  const [shops, setShops] = useState([
    {
      url: "https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg",
      link: "shopProducts",
      name: "You & Me",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2tv9RdTO23Nmk02wJECUCW1CkmOfNnBWmg&s",
      link: "",
      name: "Biryani shop",
    },
    {
      url: "https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg",
      link: "",
      name: "You & Me",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2tv9RdTO23Nmk02wJECUCW1CkmOfNnBWmg&s",
      link: "",
      name: "Biryani shop",
    },
    {
      url: "https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg",
      link: "",
      name: "You & Me",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2tv9RdTO23Nmk02wJECUCW1CkmOfNnBWmg&s",
      link: "",
      name: "Biryani shop",
    },
    {
      url: "https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg",
      link: "",
      name: "You & Me",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2tv9RdTO23Nmk02wJECUCW1CkmOfNnBWmg&s",
      link: "",
      name: "Biryani shop",
    },
    {
      url: "https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg",
      link: "",
      name: "You & Me",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2tv9RdTO23Nmk02wJECUCW1CkmOfNnBWmg&s",
      link: "",
      name: "Biryani shop",
    },
    {
      url: "https://www.shutterstock.com/image-vector/shop-logo-good-260nw-1290022027.jpg",
      link: "",
      name: "You & Me",
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN2tv9RdTO23Nmk02wJECUCW1CkmOfNnBWmg&s",
      link: "",
      name: "Biryani shop",
    },
  ]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { data } = await Axios.get("/users");
      // console.log(data);
    } catch (err) {
      navigate("/");
      // alert(err.response.data.message);
    }
  };
  return (
    <div className="category">
      <div className="ad-base">
        {ads.map((e, i) => (
          <Advertisement key={i} data={e} />
        ))}
      </div>
      <div className="shopBase">
        <h1>Shops</h1>
        <div className="container">
          {shops.map((e, i) => (
            <Shops key={i} data={e} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default mainContent;
