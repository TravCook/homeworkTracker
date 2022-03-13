import React from 'react'
import moment from 'moment'
import './student.css'


const Student = (props) => {
  //these two variables are used for testing to ensure the checked date is past homwork duedates
  // const testDate = new Date(2022, 6, 25)
  // const testMoment = moment(testDate)
  let ungraded = []
  let incomplete = []
  let unsubmitted = []
  let missingNo

  // renders the number of missing assignments for a student
  const renderMissing = () => {
    let unsubmittednum = unsubmitted.length
    let incompletenum = incomplete.length
    missingNo = unsubmittednum + incompletenum
  }
  
  //renders missing homeworks in a students row
  const renderHW = () => {
    // console.log(props)
    props.homework.map((homework) => {
      if(homework.assignmentTitle.includes("Milestone") || homework.assignmentTitle.includes("Intro") || homework.assignmentTitle.includes("Prework") || homework.assignmentTitle.includes("22:")){
      }else{
        props.assignments.map((assignment) => {
          if(assignment.title === homework.assignmentTitle){
            if(moment().isAfter(assignment.dueDate)){ 
              if(homework.submitted){
                if(homework.grade){
                  if(homework.grade === "Incomplete"){
                    const assignment = homework.assignmentTitle.split(":")[0] + ", "
                    incomplete.push(assignment)
                    incomplete.sort( (a,b) => {
                    return a.localeCompare(b);
                    })
                  }
                }else{
                  const assignment = homework.assignmentTitle.split(":")[0] + ", "
                  ungraded.push(assignment)
                  ungraded.sort( (a,b) => {
                  return a.localeCompare(b);
                  })
                }

              }else{
                const assignment = homework.assignmentTitle.split(":")[0] + ", "
                unsubmitted.push(assignment)
                unsubmitted.sort( (a,b) => {
                  return a.localeCompare(b);
                })
              }
            }
          } 
        })
      }
    })
  }

  renderHW()
  renderMissing()



  return (
    <tr className="Student" id={props.name}>
      <td className="StudentName">{props.name}</td>
      <td className="Unsubmitted">{unsubmitted}</td>
      <td className="Ungraded">{ungraded}</td>
      <td className="Incomplete">{incomplete}</td>
      <td className={"Missing" + (missingNo<2 ? " table-success" : "") + (missingNo===2 ? " table-warning" : "") + (missingNo>2 ? " table-danger" : "")}>{missingNo}</td>
    </tr>
  )
}

export default Student