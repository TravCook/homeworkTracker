const express = require('express')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/api/login', (req, res) => {
  console.log("ROUTE HIT")
    axios({
      method: "POST",
      url: 'https://bootcampspot.com/api/instructor/v1/login',
      data: JSON.stringify({
        email: process.env.BCS_EMAIL,
        password: process.env.BCS_PASS
      })
    }).then(response => {
      console.log(response)
      const token = response.data.authenticationInfo.authToken
      axios({
        method: "POST",
        url: 'https://bootcampspot.com/api/instructor/v1/grades',
        headers: {
          'Content-Type': "application/json",
          'authToken' : token
        },
        data: JSON.stringify({
          "courseId": 3776
        })
      }).then((response) => {
        // console.log(response.data)
        res.json(response.data)
      })
    })
    // .then(data => {
    //   console.log(data)
    //   const token = data.authenticationInfo.authToken
    //   res.json(token)
    // })
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
})

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));