import React, { useState } from 'react';
import './LoginForm.css'; 
const LoginForm = () => {
  const [isSignInActive, setIsSignInActive] = useState(false);

  const toggleSignIn = () => {
    setIsSignInActive(false);
  };

  const toggleSignUp = () => {
    setIsSignInActive(true);
  };

  return (
    <div className='total'>
    <div className={`container ${isSignInActive ? 'right-panel-active' : ''}`}>
      <div className="container-form signUp">
        <form className="form">
          <h2 className="title">Super Admin</h2>
          <input type="email" className="input" placeholder="Email" />
          <input type="password" className="input" placeholder="Password" />
          <button className="btn">Login</button>
        </form>
      </div>

      <div className="container-form signIn">
        <form className="form">
          <h2 className="title">Franchise Staff</h2>
          {/* <input type="text" className="input" placeholder="User" /> */}
          <input type="email" className="input" placeholder="Email" />
          <input type="passwoard" className="input" placeholder="Passwaord" />
          <a href="#" className="link">
            Do you want to register for <span style={{textDecoration:'underline',color:'green'}}>Franchise?</span>
          </a>
          <button className="btn">Login</button>
        </form>
      </div>

      <div className="container-overlay">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <button className="btn" onClick={toggleSignIn}>
              Franchise Staff 
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <button className="btn" onClick={toggleSignUp}>
             Super Admin
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
