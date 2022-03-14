import React from 'react'

const ClassDiv = (props) => {
  console.log(props)
  return(
    <form className="card" id={props.classData.id} >
      <div>{props.classData.course.name}</div>
      <button id={props.classData.courseId} type="submit" className="btn btn-primary formSubmit" onClick={props.onClick}>CHOOSE CLASS</button>
    </form>
  )
}

export default ClassDiv