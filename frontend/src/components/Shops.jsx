import React from "react";
import "../Css/Shops.css";
import { Link } from "react-router-dom";
const Shops = ({ data }) => {
  return (
    <>
      <Link to={data.link}>
        <div className="shoperBox">
          <div className="top">
            <img src={data.url} />
          </div>
          <div className="name">{data.name}</div>
        </div>
      </Link>
    </>
  );
};

export default Shops;
