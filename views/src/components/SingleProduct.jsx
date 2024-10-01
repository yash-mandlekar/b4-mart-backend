import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Css/item.css";
const SingleProduct = () => {
  const [singleProduct, setSingleProduct] = useState({
    img: "https://5.imimg.com/data5/SELLER/Default/2021/9/SZ/QF/KE/99188395/ice-cream-packaging-boxes-3-1524677180-8.jpg",
    productName: "Vanilla Icecream",
    quantity: "500g",
    price: 250,
    link: "/home/item",
  });
  const [quantity, setQuantity] = useState(0);

  
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 0));
  };
  return (
    <>
      <div className="item">
        <div className="itemContainer">
          <div className="itemPhoto">
            <img src={singleProduct.img} alt="" />
          </div>
          <div className="itemInfo">
            <h1>Vanilla Icecream</h1>
            <p>{singleProduct.quantity}</p>
          <div className="priceOverlap">
          <p>
              MRP <b>₹{singleProduct.price}</b>
            </p>
            <button type="button" className="button">
      {quantity === 0 ? (
        
        <span className="button__text" onClick={increaseQuantity}>
          Add Item
        </span>
      ) : (
        
        <div className="button__content">
          <span className="button__icon" onClick={decreaseQuantity}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
          <span className="button__text">{quantity}</span>
          <span className="button__icon" onClick={increaseQuantity}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              height="24"
              fill="none"
              className="svg"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </span>
        </div>
      )}
    </button>
          </div>
            <h2>Product Details</h2>
            <h4>Unit</h4>
            <p className="specification">1</p>
            <h4>Flavour</h4>
            <p className="specification">Vanilla Magic</p>
            <h4>Pack Type</h4>
            <p className="specification">The product is non-returnable. For a damaged, defective, expired or incorrect item, you can request a replacement within 24 hours of delivery.
            In case of an incorrect item, you may raise a replacement or return request only if the item is sealed/ unopened/ unused and in original condition. </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
