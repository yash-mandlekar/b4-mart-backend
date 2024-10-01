import React from "react";
import "../Css/LogIn.css";
const AdminLogin = () => {
  return (
    <div className="adminpage" style={{ backgroundColor: "#e8e8e8" }}>
      <form className="form-control" action="">
        <p className="title">Admin Login</p>
        <div className="input-field">
          <input required="" className="inputAdmin" type="text" />
          <label className="label" for="inputAdmin">
            Enter Email
          </label>
        </div>
        <div className="input-field">
          <input required="" className="inputAdmin" type="password" />
          <label className="label" for="inputAdmin">
            Enter Password
          </label>
        </div>

        <button className="submit-btn">Sign In</button>
      </form>
    </div>
  );
};

export default AdminLogin;
