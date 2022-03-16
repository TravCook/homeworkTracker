import React from "react";
import Student from "../student/student";
import "./studentTable.css";
import Form from "react-bootstrap/Form";

const StudentTable = (props) => {
  let studentWork = [];

  const createSelectItems = () => {
    let items = [];
    props.classes.map((classItem, index) => {
      items.push(
        <option key={index} id={classItem.id} value={classItem.courseId}>
          {JSON.stringify(classItem.course.code)}
        </option>
      );
    });
    return items;
  };

  return (
    <div className="student-table">
      <div className="student-table-header">
        <h5>
          <b>Student Grades</b>
        </h5>
        <Form.Select className="w-auto" onChange={props.onClick}>{createSelectItems()}</Form.Select>
      </div>
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
              studentWork = [];
              props.homeworkData.map((homework) => {
                if (homework.studentName === name) {
                  studentWork.push(homework);
                }
              });
              return (
                <Student
                  name={name}
                  key={name}
                  homework={studentWork}
                  assignments={props.assignmentData}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentTable;
