import React from 'react'
import moment from 'moment'


const Student = (props) => {
  const testDate = new Date(2022, 6, 25)
  const testMoment = moment(testDate)
  console.log(props)
  return (
    <tr className="Student" id={props.name}>
      <td className="StudentName">{props.name}</td>
      <td className="Unsubmitted"></td>
      <td className="Ungraded"></td>
      <td className="Incomplete"></td>
      <td className="Missing"></td>
    </tr>
  )
}

export default Student