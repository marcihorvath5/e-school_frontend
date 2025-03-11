import { useEffect } from "react";
import "../App.css";
import useDataStore from "../store/DataStore.jsx";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import StudentGrades from "./StudentGrade.jsx";

function StudentList({ selectedClassName }) {
  const { setSelectedClass, studentsByClass, fetchClass, setSelectedStudent } =
    useDataStore();

  useEffect(() => {
    if (selectedClassName) {
      setSelectedClass(selectedClassName);
      setSelectedStudent(null);
      fetchClass(selectedClassName);
      console.log(selectedClassName);
    }
  }, [selectedClassName]);

  return (
    <>
      <List>
        {studentsByClass.students?.map((student) => (
          <ListItem key={student.id} component="div" disablePadding>
            <ListItemButton onClick={() => setSelectedStudent(student)}>
              <ListItemText primary={`${student.id}: ${student.email}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <StudentGrades />
    </>
  );
}

export default StudentList;
