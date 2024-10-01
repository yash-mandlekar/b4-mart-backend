import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Login.css'
const SignUp = () => {
  return (
    <div>
       <div className='base'>
      <div className="text">
        <h1>Roll The Carpet.!</h1>
        <div className='skip'>Skip the lag?</div>
      </div>
      <div className="loginForm">
        <div className="box"></div>
        <div className="box2"></div>
        <div className="loginBox signUpBox">
       

	<p className="title">SignUp</p>
	{/* <p className="title toto">Enter Your Phone Number</p> */}
  <p className='sp-text'>Just some details to get you in.!</p>
	<form className="form">
  <div className="input-group">
			<label htmlFor="password">Username</label>
			<input type="text" name="username" id="username" placeholder="Username"/>
			
		</div>
		<div className="input-group">
			<label htmlFor="username">Mobile</label>
			<input type="number" name="number" id="number" placeholder="Mobile No.  "/>
		</div>
    <div className="input-group">
			<label htmlFor="username">Password</label>
			<input type="password" name="password" id="password" placeholder="Password  "/>
		</div>
	
		<button className="sign">SignUp</button>
	</form>
	<div className="social-message">
		<div className="line"></div>
		<p className="message">OR</p>
		<div className="line"></div>
	</div>
<div className='signUp'>
<p className="sign-up-label">
        Already Registered ? <Link to="/"><span className="sign-up-link">LogIn</span></Link>
      </p>
</div>

  <div className='link'>
    <Link>Customer care</Link>
    <Link>Terms & Conditions</Link>
    <Link>Support</Link>
  </div>
 


        </div>
      </div>
      </div> 
    </div>
  );
}

export default SignUp;
