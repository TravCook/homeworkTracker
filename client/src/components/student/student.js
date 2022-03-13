import React from 'react'

const Student = (props) => {
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