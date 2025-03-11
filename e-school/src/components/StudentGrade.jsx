import { useEffect } from "react";
import useDataStore from "../store/DataStore";
import "../App.css";
const StudentGrades = () => {
  const { selectedStudent } = useDataStore();

  if (!selectedStudent) {
    return <p>Válasszon ki egy tanulót</p>;
  }

  return (
    <>
      <h3>{selectedStudent.email} jegyei</h3>
      {selectedStudent.grades.length > 0 ? (
        <ul>
          {selectedStudent.grades.map((subject) => (
            <li key={subject.subjectName}>
              {subject.subjectName}
              <ul>
                {subject.grades.map((grade) => (
                  <li key={grade.gradeId}>
                    {grade.gradeId}:{grade.gradeValue}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>valami</p>
      )}
    </>
  );
};

export default StudentGrades;
