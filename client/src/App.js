import React, { useState, useEffect } from 'react';
import './App.css';
import Login from "./components/login/login.js"
import { LoginProvider } from './utils/loginContext';

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleEmailChange = (event) => {
    const formEmail = event.target.value;
    setEmail(formEmail);
  };

  const handlePasswordChange = (event) => {
    const formPassword = event.target.value;
    setPassword(formPassword);
  };

  let listOfStudents = [];

  const filterUniqueStudents = (students) => {
    let unique = [];
    for (let i = 0; i < students.length; i++) {
      if (unique.indexOf(students[i]) === -1) {
        unique.push(students[i]);
      }
    }
    return unique;
  };



  const loginSubmit = (e) => {
    e.preventDefault()
    const loginCred = {
    email: email,
    password: password
    }
    console.log(loginCred)
    const body = {
      email: loginCred.email,
      password: loginCred.password
    }
  
    fetch('/api/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).then((res) => 
      res.json())
      .then((data) => {
        console.log(data)
        //THIS IS WHERE THE STUDENT RENDERING NEEDS TO HAPPEN
        for (let i = 0; i < data.homeworks.length; i++) {
          listOfStudents.push(data.homeworks[i].studentName);
        }
        listOfStudents = filterUniqueStudents(listOfStudents);
        console.log(listOfStudents)
        // getgrades(data)
      })
  }
  



  return (
    <div className="App">
      <LoginProvider>
        <Login handleClick={loginSubmit} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange}></Login>
      </LoginProvider>
    </div>
  );
}

export default App;
