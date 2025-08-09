import { useState } from "react";

export default function App() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1" },
    { id: 2, name: "Student 2" },
  ]);
  const [editMode, setEditMode] = useState(false);
  const [editableStudent, setEditableStudent] = useState(null);

  const handleStudentName = (e) => {
    setStudentName(e.target.value);
  };

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (studentName.trim() === "") {
      return alert(`Please provide a valid name`);
    }

    editMode ? handeleUpdateStudent() : handleCreateStudent();
  };

  const handleCreateStudent = () => {
    const newStudent = {
      id: Date.now() + "",
      name: studentName,
      isPresent: undefined,
    };

    setStudents([...students, newStudent]);
    setStudentName("");
  };

  const handeleUpdateStudent = () => {
    const updateStudent = students.map((item) => {
      if (item.id === editableStudent.id) {
        return { ...item, name: studentName };
      }
      return item;
    });

    setStudents(updateStudent);
    setEditMode(false);
    setEditableStudent(null);
    setStudentName("");
  };

  const handleEditMode = (student) => {
    setEditMode(true);
    setEditableStudent(student);
    setStudentName(student.name);
  };

  const handleRemoveStudent = (studentId) => {
    setStudents(students.filter((item) => item.id !== studentId));
  };

  const handlePresentStudent = (student) => {
    if (student.isPresent !== undefined) {
      return alert(
        `This student is alredy added in ${
          student.isPresent === true ? "Present Student" : "Absent Student"
        }`
      );
    }
    const updateStudentList = students.map((item) => {
      if (item.id === student.id) {
        return { ...item, isPresent: true };
      }
      return item;
    });
    setStudents(updateStudentList);
  };

  const handleAbsentStudent = (student) => {
    if (student.isPresent !== undefined) {
      return alert(
        `This student is alredy added in ${
          student.isPresent === true ? "Present Student" : "Absent Student"
        }`
      );
    }
    const updateStudentList = students.map((item) => {
      if (item.id === student.id) {
        return { ...item, isPresent: false };
      }
      return item;
    });
    setStudents(updateStudentList);
  };

  return (
    <>
      <form onSubmit={handleStudentSubmit}>
        <input type="text" value={studentName} onChange={handleStudentName} />
        <button type="submit">
          {editMode ? "Update Student" : "Add Student"}
        </button>
      </form>
      <div className="student-list">
        <div className="all-student">
          <h2>All Student</h2>
          <ul>
            {students.map((student) => {
              return (
                <>
                  <li>
                    <span>{student.name}</span>
                    <button onClick={() => handleEditMode(student)}>
                      Edit
                    </button>
                    <button onClick={() => handleRemoveStudent(student.id)}>
                      Remove
                    </button>
                    <button onClick={() => handlePresentStudent(student)}>
                      Send To Present Student
                    </button>
                    <button onClick={() => handleAbsentStudent(student)}>
                      Sent To Absent Student
                    </button>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        <br />
        <hr />
        <div className="present-student">
          <h2>Present Student</h2>
          <ul>
            {students
              .filter((item) => item.isPresent === true)
              .map((student) => {
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button>Accidentaly Added</button>
                </li>;
              })}
          </ul>
        </div>
        <br />
        <hr />
        <div className="absent-student">
          <h2>Absent Student</h2>
          <ul>
            {students
              .filter((item) => item.isPresent === false)
              .map((student) => {
                <li key={student.id}>
                  <span>{student.name}</span>
                  <button>Accidentaly Added</button>
                </li>;
              })}
          </ul>
        </div>
      </div>
    </>
  );
}
