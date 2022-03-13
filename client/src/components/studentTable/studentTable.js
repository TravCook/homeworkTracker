import React from 'react'
import Student from '../student/student'
import './studentTable.css'


const StudentTable = (props) => {
  let studentWork = []
  return (
    <div className="table-responsive studentList hidden">
      <table className="table table-hover table-bordered rounded">
        <thead>
          <tr>
            <th scope="col">Student Name</th>
            <th scope="col">Unsubmitted</th>
            <th scope="col">Ungraded</th>
            <th scope="col">Incomplete</th>
            <th scope="col">Missing</th>
          </tr>
        </thead>
        <tbody>
          {/* this renders each student their own row */}
          {props.studentData.map((name) => {
            studentWork = []
            props.homeworkData.map((homework) => {
              if(homework.studentName === name){
                studentWork.push(homework)
              }
            })
            return(
              <Student name={name} key={name} homework={studentWork} assignments={props.assignmentData} />
            )
            
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable