const express = require('express')
const path = require('path')
const axios = require('axios')
require('dotenv').config()
// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;
let token
let courseID
let enrollmentID
// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


app.post('/api/login', async (req, res) => {
  try{
    await axios({
      method: "POST",
      url: 'https://bootcampspot.com/api/instructor/v1/login',
      data: req.body
    }).then(response => {
      token = response.data.authenticationInfo.authToken
      axios({
        method: "POST",
        url: 'https://bootcampspot.com/api/instructor/v1/me',
        headers: {
          'Content-Type': "application/json",
          'authToken' : token
          }
      }).then(async (response) => {
        // console.log(response.data)
        enrollmentID = response.data.Enrollments[0].id
        courseID = response.data.Enrollments[0].courseId
        axios.all([
          await axios({
            method: "POST",
            url: 'https://bootcampspot.com/api/instructor/v1/assignments',
            headers: {
                'Content-Type': "application/json",
                'authToken' : token
              },
              data: JSON.stringify({
                "enrollmentId": enrollmentID
              })
          }),
          await axios({
            method: "POST",
            url: 'https://bootcampspot.com/api/instructor/v1/grades',
            headers: {
              'Content-Type': "application/json",
              'authToken' : token
            },
            data: JSON.stringify({
              "courseId": courseID
            })
          })
        ])
        .then(axios.spread((data1, data2) => {
          let calendarAssignments = data1.data.calendarAssignments;
              
          const data = {
            assignments: calendarAssignments,
            homeworks: data2.data,
          };
          res.send(data)
        }))
      })
    })
  }catch(err){
    if(err) throw (err)      
  }
})


// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));