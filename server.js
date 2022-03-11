const express = require('express')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;
let token
let courseID
// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

app.get('/grades', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/grades.html'));
})


app.post('/api/login', (req, res) => {
    axios({
      method: "POST",
      url: 'https://bootcampspot.com/api/instructor/v1/login',
      data: req.body
    }).then(response => {
      //TODO ADD THE ME ENDPOINT HERE TO GET THE CLASS
      token = response.data.authenticationInfo.authToken
    axios({
      method: "POST",
        url: 'https://bootcampspot.com/api/instructor/v1/me',
        headers: {
          'Content-Type': "application/json",
          'authToken' : token
        }
    }).then((response) => {
      // console.log(response.data)
      courseID = response.data.Enrollments[0].courseId
      axios({
        method: "POST",
        url: 'https://bootcampspot.com/api/instructor/v1/grades',
        headers: {
          'Content-Type': "application/json",
          'authToken' : token
        },
        data: JSON.stringify({
          "courseId": courseID
        })
      }).then((response) => {
        res.json(response.data)
      })
    })
    })
})


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));