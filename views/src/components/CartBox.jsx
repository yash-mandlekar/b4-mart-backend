import React from 'react';
import { Link } from 'react-router-dom';

const CartBox = ({data}) => {
  return (
  
    <div>
       <div className="line"></div>
          <div className="itemsList">
            <div className="shoppingItemImg">
              <img src={data.img} alt="" />
            </div>
            <div className="shoopingDetails">
              <h3>{data.productName}</h3>
              <p>{data.quantity}</p>
              <span>In Stock</span>
              <p>
                <b>About this item:</b>Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Corporis, natus culpa unde facere impedit amet
                quia assumenda, officia recusandae ducimus, temporibus ratione
                dolore earum!
              </p>
              <p>
                <b>Cancellation Policy :</b> Orders cannot be cancelled once
                packed for delivery. In case of unexpected delays, a refund will
                be provided, if applicable.
              </p>
              <Link>Delete this item</Link>
            </div>
            <div className="productPrice">₹{data.price}</div>
          </div>
          <div className="line"></div>
    </div>
  );
}

export default CartBox;
