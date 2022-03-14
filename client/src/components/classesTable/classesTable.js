import React from 'react'
import Class from '../class/class.js'
import "./classesTable.css"

const Classes = (props) => {
  console.log(props)
  return(
    <div className="container classContainer">
      {props.classes.map((classes) => {
        if(classes.courseRoleId !== 2){
        return (
          <Class key={classes.course.id} classData={classes} onClick={props.onClick} />
        )
      }
      })}
    </div>
  )
}

export default Classes