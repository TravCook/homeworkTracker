import React from 'react'
import Student from '../student/student'

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
          {console.log(props.students)}
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable