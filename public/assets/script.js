

let listOfStudents = [];

// takes in the filtered student array and renders the student rows in the html file
const renderStudents = (students) => {
  const studentList = $(".studentList")
  students.forEach((student) => {
    const studentEl = document.createElement('div')
    $(studentEl).addClass("row Student border-bottom border-dark").attr('id', student)
    
    const studentName = document.createElement('div')
    $(studentName).addClass("col-1 studentName").text(student)
    studentEl.append(studentName)

    const unsubmittedHW = document.createElement('div')
    $(unsubmittedHW).addClass("col unsubmitted border-end border-start border-secondary")
    studentEl.append(unsubmittedHW)

    const ungradedHW = document.createElement('div')
    $(ungradedHW).addClass("col ungraded border-end border-start border-secondary")
    studentEl.append(ungradedHW)

    const incompleteHW = document.createElement('div')
    $(incompleteHW).addClass("col incomplete border-end border-start border-secondary")
    studentEl.append(incompleteHW)

    const missing = document.createElement('div')
    $(missing).addClass("col-1 missingNo")
    studentEl.append(missing)

    studentList.append(studentEl)
  })
}

// takes in a student array and returns a filtered array of UNIQUE students rip people who have the same name
const filterUniqueStudents = (students) => {
  let unique = [];
  for (let i = 0; i < students.length; i++) {
    if (unique.indexOf(students[i]) === -1) {
      unique.push(students[i]);
    }
  }
  return unique;
};


// THIS FUNCTION IS NOW BEING RAN INSIDE THE POST REQUEST ON LINE 152 AFTER THE FORM IS SUBMITTED
// const getAllStudents = () => {
//   fetch("/api/login", {
//     method: "GET",
//     "Content-Type": "application/json",
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       for (i = 0; i < data.length; i++) {
//         listOfStudents.push(data[i].studentName);
//       }
//       listOfStudents = filterUniqueStudents(listOfStudents);
//       renderStudents(listOfStudents)
//     });
// };



//current code that renders values for student rows


const getgrades = (data) => {
  let students = $(".Student")
  students.each((x) => {
    let unsubmitted = []
    let ungraded = []
    let incomplete = []
    for(i=0;i<data.length;i++){
      if(data[i].assignmentTitle.includes("Milestone") || data[i].assignmentTitle.includes("Intro") || data[i].assignmentTitle.includes("Prework") || data[i].assignmentTitle.includes("22:")){

      }else{
        if(data[i].studentName === students[x].attributes[1].value){
          if(data[i].submitted){
            if(data[i].grade){
              if(data[i].grade === "Incomplete"){
                const assignment =" " + data[i].assignmentTitle.split(":")[0]
                incomplete.push(assignment)
                incomplete.sort( (a,b) => {
                  return a-b;
                })
                $(students[x].children[3]).text(incomplete)
              }
            }else{
              const assignment = " " + data[i].assignmentTitle.split(":")[0]
              ungraded.push(assignment)
              ungraded.sort( (a,b) => {
                return a-b;
              })
              $(students[x].children[2]).text(ungraded)
            }

          }else{
            const assignment = " " + data[i].assignmentTitle.split(":")[0]
            unsubmitted.push(assignment)
            unsubmitted.sort( (a,b) => {
              return a-b;
            })
            $(students[x].children[1]).text(unsubmitted)
          }
        }
      }
    }
    let unsubmittednum = unsubmitted.length
    let incompletenum = incomplete.length
    let missingNo = unsubmittednum + incompletenum
    let numDiv = $(students[x].children[4])
    numDiv.text(missingNo)
    if(missingNo < 2) {
      numDiv.css({
       backgroundColor: "DarkGreen",
       color: "black"
      })
    }else if (missingNo === 2){
      numDiv.css({
        backgroundColor: "DarkGoldenRod"
       })
    }else {
      numDiv.css({
        backgroundColor: "DarkRed"
       })
    }
  })
}

// Event listener for the form submission from the login side
$(".formSubmit").on('click', (e) => {
  e.preventDefault()
  $(".studentList").removeClass("hidden")
  $(".loginForm").addClass("hidden")
  const email = $("#emailInput")
  const password = $("#passwordInput")
  const loginCred = {
  email: email[0].value,
  password: password[0].value
  }
  getHW(loginCred)
})

//login function handler
const getHW = (loginCred) => {
  // getAllStudents();
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
      //THIS IS WHERE THE STUDENT RENDERING NEEDS TO HAPPEN
      for (i = 0; i < data.length; i++) {
        listOfStudents.push(data[i].studentName);
      }
      listOfStudents = filterUniqueStudents(listOfStudents);
      renderStudents(listOfStudents)
      console.log(data)
      getgrades(data)})
}



$(document).ready(() => {
  const changeClass = () => {
    const width = document.body.clientWidth
    if (width < 1100){
      $('.studentName').removeClass('col-1')
      $('.studentName').addClass('col')
      $('.missingNo').removeClass('col-1')
      $('.missingNo').addClass('col')
    }
  }
  $(window).resize(()=>{
    changeClass()
  })
  changeClass()
})



