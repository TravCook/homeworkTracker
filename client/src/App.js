import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Login from "./components/login/login.js"
import StudentTable from './components/studentTable/studentTable.js';

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [assignments, setAssignments] = useState()
  const [homeworks, setHomeworks] = useState()
  const [students, setStudents] = useState()

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
    }).then(async (res) => 
      await res.json())
      .then((data) => {
        setHomeworks(data.homeworks)
        setAssignments(data.assignments)
        //THIS IS WHERE THE STUDENT RENDERING NEEDS TO HAPPEN
        for (let i = 0; i < data.homeworks.length; i++) {
          listOfStudents.push(data.homeworks[i].studentName);
        }
        listOfStudents = filterUniqueStudents(listOfStudents);
        setStudents(listOfStudents)
        // getgrades(data)
      })
  }
  


  const renderPage = () => {
    if(students){
      return(
        <StudentTable  studentData={students} assignmentData={assignments} homeworkData={homeworks}/>
      )
    }else{
      return(
        <Login handleClick={loginSubmit} handleEmailChange={handleEmailChange} handlePasswordChange={handlePasswordChange} />
      )
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
