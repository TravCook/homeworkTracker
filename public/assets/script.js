let listOfStudents = [];
let unsubmitted
let ungraded
let incomplete
let dateCheckCond
let students 

// takes in the filtered student array and renders the student rows in the html file
const renderStudents = (students) => {
  const studentTable = $(".table")
  students.forEach((student) => {
    const studentRow = document.createElement('tr')
    $(studentRow).addClass("Student").attr('id', student)
    const studentName = document.createElement('td')
    $(studentName).text(student)
    studentRow.append(studentName)
    const unsubmittedHW = document.createElement('td')
    studentRow.append(unsubmittedHW)
    const ungradedHW = document.createElement('td')
    studentRow.append(ungradedHW)
    const incompleteHW = document.createElement('td')
    studentRow.append(incompleteHW)
    const missing = document.createElement('td')
    studentRow.append(missing)
    studentTable.append(studentRow)
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

const dateCheck = (assignments) => {
  console.log(assignments.calendarAssignments)
  // for(i=0;i<assignments.calendarAssignments.length;i++){
    if(moment().isAfter(assignments.calendarAssignments[0].dueDate)){
      dateCheckCond = `data.homework[i].assignmentTitle.includes("1: C")`
      console.log(dateCheckCond)
    }else if(moment().isAfter(assignments.calendarAssignments[1].dueDate)){
      console.log("false")
    }
  // }
}
const homeworkRender = (data) => {
  if(data.homework.studentName === students[data.studentIndex].attributes[1].value){
    if(data.homework.submitted){
      if(data.homework.grade){
        if(data.homework.grade === "Incomplete"){
          const assignment =" " + data.homework.assignmentTitle.split(":")[0]
          incomplete.push(assignment)
          incomplete.sort( (a,b) => {
            return a-b;
          })
          $(students[data.studentIndex].children[3]).text(incomplete)
        }
      }else{
        const assignment = " " + data.homework.assignmentTitle.split(":")[0]
        ungraded.push(assignment)
        ungraded.sort( (a,b) => {
          return a-b;
        })
        $(students[data.studentIndex].children[2]).text(ungraded)
      }
    }else{
      const assignment = " " + data.homework.assignmentTitle.split(":")[0]
      unsubmitted.push(assignment)
      unsubmitted.sort( (a,b) => {
        return a-b;
      })
      $(students[data.studentIndex].children[1]).text(unsubmitted)
    }
  }
}

//current code that renders values for student rows
const getgrades = (data) => {
  console.log(data)
  const testDate = new Date(2022, 6, 25)
  const testMoment = moment(testDate)
  students = $(".Student")
  students.each((x) => {
    unsubmitted = []
    ungraded = []
    incomplete = []
    for(i=0;i<data.homeworks.length;i++){
      if(data.homeworks[i].assignmentTitle.includes("Milestone") || data.homeworks[i].assignmentTitle.includes("Intro") || data.homeworks[i].assignmentTitle.includes("Prework") || data.homeworks[i].assignmentTitle.includes("22:")){
      }else{
        for(m=0;m<data.assignments.calendarAssignments.length; m++){
        if(moment().isAfter(data.assignments.calendarAssignments[m].dueDate)){
          if(data.homeworks[i].assignmentTitle === data.assignments.calendarAssignments[m].title){
            homeworkRender({
              homework: data.homeworks[i],
              studentIndex: x
            })
          }
        }else{
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
      numDiv.addClass("table-success")
    }else if (missingNo === 2){
      numDiv.addClass("table-warning")
    }else {
      numDiv.addClass("table-danger")
    }
  })
}

// Event listener for the form submission from the login side
$(".formSubmit").on('click', (e) => {
  e.preventDefault()
  $(".studentList").removeClass("hidden")
  $(".container").addClass("hidden")
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
      for (i = 0; i < data.homeworks.length; i++) {
        listOfStudents.push(data.homeworks[i].studentName);
      }
      listOfStudents = filterUniqueStudents(listOfStudents);
      renderStudents(listOfStudents)
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



