import React, { useState, useEffect } from 'react';
import './login.css'
import { useLoginContext } from '../../utils/loginContext';


const Login = (props) => {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return(
    <div class="container login-centering rounded border">
      <form class="loginForm" >
        <div class="form-group">
          <label for="emailInput">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={props.handleEmailChange}
          />
          <small id="emailHelp" class="form-text text-muted"
            >We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Password"
            onChange={props.handlePasswordChange}
          />
        </div>
        <button type="submit" class="btn btn-primary formSubmit" onClick={props.handleClick}>Submit</button>
      </form>
    </div>
  )
}

export default Login