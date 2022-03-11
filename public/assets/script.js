let students = $(".Student")


const getgrades = (data) => {
  students.each((x) => {
    let unsubmitted = []
    let ungraded = []
    let incomplete = []
    for(i=0;i<data.length;i++){
      if(data[i].assignmentTitle.includes("Milestone") || data[i].assignmentTitle.includes("Intro") || data[i].assignmentTitle.includes("Prework")){

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

const getHW = () => {
  fetch('/api/login', {
    "method": "GET",
    "Content-Type": "application/json"
  }).then((res) => res.json())
    .then((data) => getgrades(data))
}

getHW()
