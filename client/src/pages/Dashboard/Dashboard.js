import React from "react";
import DataContainers from "../../components/DataContainer/DataContainer";
import DashNavbar from "../../components/Navbar/DashNavbar";
import DataContainer from "../../components/DataContainer/DataContainer.js";
import Classes from "../../components/classesTable/classesTable.js";
import StudentTable from "../../components/studentTable/studentTable";
import './Dashboard.css'

export default function Dashboard(props) {
  return (
    <>
      <DashNavbar />
      <div className="data-wrapper">
        <DataContainer />
        <DataContainer />
        <DataContainer />
      </div>
      <StudentTable classes={props.classes} onClick={props.classSelect} studentData={props.studentData} assignmentData={props.assignmentData} homeworkData={props.homeworkData}/>
    </>
  );
}
