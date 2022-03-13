import React from 'react';
import './login.css'


const Login = (props) => {

  return(
    <div className="container login-centering rounded border">
      <form className="loginForm" >
        <div className="form-group">
          <label htmlFor="emailInput">Email address</label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={props.handleEmailChange}
          />
          <small id="emailHelp" className="form-text text-muted"
            >We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password</label>
          <input
            type="password"
            className="form-control"
            id="passwordInput"
            placeholder="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit" className="btn btn-primary formSubmit" onClick={props.handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default Login