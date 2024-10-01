import React, { useState } from "react";
import SideNav from "./SideNav";
import "../Css/ShoppingCart.css";
import { Link } from "react-router-dom";
import CartBox from "./CartBox";

const Cart = () => {
  
  const [singleProduct, setSingleProduct] = useState([{
    img: "https://5.imimg.com/data5/SELLER/Default/2021/9/SZ/QF/KE/99188395/ice-cream-packaging-boxes-3-1524677180-8.jpg",
    productName: "Vanilla Icecream",
    quantity: "500g",
    price: 250,
    link: "/home/item",
  }]);
  return (
    <div>
      <div className="shoppingCart">
        <div className="longBox">
          <h1>Cart List</h1>
          {singleProduct.map((e,i)=>(
            <CartBox data={e} key={i}/>
          ))}
          <div className="billContainer">
          <h1>Bill Details</h1>
          <p>Total Items : 1</p>
          <p>Delivery Charge : 0</p>
          <p>Handling Charge : ₹2</p>
         <div className="payrap">
         <h2>Grand total(1 item) : <span>₹250</span></h2>
         <button className="button">Procced to pay</button>
         </div>
          </div>
        </div>
      </div>
      <SideNav />
    </div>
  );
};

export default Cart;
