require('dotenv').config();
let token
let students = $(".Student")

const getgrades = () => {
  fetch("https://bootcampspot.com/api/instructor/v1/grades", {
    "method": "POST",
    "headers": {
      'Content-Type': "application/json",
      'authToken' : token
    },
    "body": JSON.stringify({
      "courseId": 3776
    })
  }).then(response => 
    response.json()
  )
  .then(data => {
    students.each((x) => {
      let unsubmitted = []
      let ungraded = []
      let incomplete = []
      // console.log(students[x].attributes[1].value)
      for(i=0;i<data.length;i++){
        if(data[i].assignmentTitle.includes("Milestone") || data[i].assignmentTitle.includes("Intro") || data[i].assignmentTitle.includes("Prework")){

        }else{
          if(data[i].studentName === students[x].attributes[1].value){
            if(data[i].submitted){
              if(data[i].grade){
                if(data[i].grade === "Incomplete"){
                  const assignment = data[i].assignmentTitle.split(":")[0] + " "
                  incomplete.push(assignment)
                  $(students[x].children[3]).text(incomplete)
                }
              }else{
                const assignment = data[i].assignmentTitle.split(":")[0] + " "
                ungraded.push(assignment)
                $(students[x].children[2]).text(ungraded)
              }

            }else{
              // console.log(data[i].assignmentTitle.split(":")[0])
              const assignment = data[i].assignmentTitle.split(":")[0] + " "
              unsubmitted.push(assignment)
              $(students[x].children[1]).text(unsubmitted)
            }
          }
        }
    }
    })
    
  })
}

const login = () => {
  fetch('https://bootcampspot.com/api/instructor/v1/login', {
    "method": "POST",
    "body": JSON.stringify({
      "email": process.env.BCS_EMAIL,
      "password": process.env.BCS_PASS
    })
  }).then(response => response.json())
  .then(data => {
    token = data.authenticationInfo.authToken
    getgrades()
  })
}

login()

