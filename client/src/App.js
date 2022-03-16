import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import Login from "./components/login/login.js"
import StudentTable from './components/studentTable/studentTable.js';
import ClassesTable from './components/classesTable/classesTable.js'
import Dashboard from './pages/Dashboard/Dashboard.js';
import { render } from 'react-dom';

function App() {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [assignments, setAssignments] = useState()
  const [homeworks, setHomeworks] = useState()
  const [students, setStudents] = useState()
  const [classes, setClasses] = useState()
  const [token, setToken] = useState()
  const [chosenClass, setChosenClass] = useState()
  const [enrollId, setEnrollId] = useState()
  let fetchparams;
  //keeps the email state value updated
  const handleEmailChange = (event) => {
    const formEmail = event.target.value;
    setEmail(formEmail);
  };

  //keeps the password state value updated
  const handlePasswordChange = (event) => {
    const formPassword = event.target.value;
    setPassword(formPassword);
  };

  let listOfStudents = [];
  //this function makes sure only one of each student is in the list of students
  const filterUniqueStudents = (students) => {
    let unique = [];
    for (let i = 0; i < students.length; i++) {
      if (unique.indexOf(students[i]) === -1) {
        unique.push(students[i]);
      }
    }
    return unique;
  };

  const classSelect1 = async (e) => {
    e.preventDefault()
    const fetchenrollid = e.target.parentNode.id
    setEnrollId(fetchenrollid)
    const fetchClass = e.target.id
    setChosenClass(fetchClass)
    fetchparams = {
      enrollId: fetchenrollid,
      chosenClass: fetchClass,
      token: token
    }
    studentDataFetch(fetchparams)
  }

  const classSelect = async (e) => {
    e.preventDefault()
    const fetchenrollid = e.target.options[e.target.selectedIndex].id // enrollmentId
    setEnrollId(fetchenrollid)
    const fetchClass = e.target.options[e.target.selectedIndex].value // courseId
    
    setChosenClass(fetchClass)
    fetchparams = {
      enrollId: fetchenrollid,
      chosenClass: fetchClass,
      token: token
    }
    studentDataFetch(fetchparams)
  }

  const studentDataFetch = (data) =>{
    fetch('/api/grades', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken": data.token
      },
      body: JSON.stringify({
        authToken: data.token,
        courseId: data.chosenClass,
        enrollId: data.enrollId
      })
    }).then((res) => 
      res.json())
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

  
  //this handles the request for data to the backend
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
    }).then((res) => 
       res.json())
      .then((data) => {
        setToken(data.authenticationInfo.authToken)
        fetch('/api/me', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            authToken: data.authenticationInfo.authToken
          })
        }).then((res) => 
          res.json())
          .then((data) => {
          setClasses(data.Enrollments)
        })
        
      })
  }
  
  const renderPage = () => {
    if(students){
      return(
        <Dashboard classes={classes} onClick={classSelect} studentData={students} assignmentData={assignments} homeworkData={homeworks}/>
      )
    }else if(classes){
      return(
        <ClassesTable classes={classes} onClick={classSelect1} />
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
