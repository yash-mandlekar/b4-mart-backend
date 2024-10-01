import React, { useEffect, useState } from "react";
import "../Css/LogIn.css";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../Axios";
const LogIn = () => {
  const navigate = useNavigate()
  const [page, setpage] = useState(0);
  const [user, setUser] = useState({
    username: "",
    contact: "",
    otp: "",
  });
  const { username, contact, otp } = user;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3) return alert("enter a vaild username");
    if (contact.length < 10) return alert("enter a vaild number");
    const { data } = await Axios.post("/login", { username, contact });
    if (data.message == "OTP send succesfully") {
      console.log(data.user.otp);
      setpage(1);
    }
  };
  const handleOTPSubmit = async(e) => {
    e.preventDefault();
    const { data } = await Axios.post("/otp", { contact, otp });
    if(data.success){
      navigate("/home")
    }
  }
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchUser();
  }, []);
  const fetchUser = async () => {
    try{
      const { data } = await Axios.get("/me");
      console.log(data);
      
      if (data.success) {
        navigate("/home")
      }
    }catch(err){
      console.log(err.response.data.message);
    }
  };


  return (
    <>
      <div className="base">
        <div className="text">
          <h1>Welcome Back.!</h1>
          <Link to="/home">
            <div className="skip">Skip the lag?</div>
          </Link>
        </div>
        <div className="loginForm">
          <div className="box"></div>
          <div className="box2"></div>
          <div className="loginBox">
            <p className="title">Login</p>
            {/* <p className="title toto">Enter Your Phone Number</p> */}
            <p className="sp-text">
              We will send you 4 digit verification code
            </p>
            {page == 0 ? (
              <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="password">Username</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={username}
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="username">Mobile</label>
                  <input
                    type="number"
                    name="contact"
                    id="number"
                    placeholder="Mobile No.  "
                    onChange={handleChange}
                    value={contact}
                  />
                </div>

                <button className="sign">Generate OTP</button>
              </form>
            ) : (
              <form className="form" onSubmit={handleOTPSubmit}>
                <div className="input-group">
                  <label htmlFor="password">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter your OTP"
                    onChange={handleChange}
                    value={otp}
                  />
                </div>
                <button className="sign">Login</button>
              </form>
            )}
            <div className="social-message">
              <div className="line"></div>
              <p className="message">OR</p>
              <div className="line"></div>
            </div>
            <div className="signUp">
              <p className="sign-up-label">
                Don't have an account? &nbsp;
                <Link to="/signup">
                  <span className="sign-up-link"> Sign up</span>
                </Link>
              </p>
            </div>

            <div className="link">
              <Link>Customer care</Link>
              <Link>Terms & Conditions</Link>
              <Link>Support</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
