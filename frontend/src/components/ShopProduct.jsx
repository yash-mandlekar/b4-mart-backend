import React, { useState } from "react";
import "../Css/product.css";
import Product from "./Product";
const ShopProduct = () => {
  const [product, setProduct] = useState([
    {
      img: "https://5.imimg.com/data5/SELLER/Default/2021/9/SZ/QF/KE/99188395/ice-cream-packaging-boxes-3-1524677180-8.jpg",
      productName: "Vanilla Icecream",
      quantity: "500g",
      price: 250,
      link:"/home/singleProduct"
    },
  ]);
  
  return (
    <div className="product">
      <h1>Products</h1>
      {product.map((e, i) => (
        <Product data={e} key={i} />
      ))}
      
    </div>
  );
};

export default ShopProduct;
