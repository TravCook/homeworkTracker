import React from 'react'
import Student from '../student/student'
import './studentTable.css'

const StudentTable = (props) => {
  console.log(props)
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
          {props.studentData.map((name, i) => {
            return(
              <Student name={name} key={i} />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable