import * as React from "react";
import {
  List,
  ListItemText,
  ListSubheader,
  Drawer,
  ListItemButton,
} from "@mui/material";

function StudentsDrawer({ open, onClose, students = [], selectedClass, onStudentClick = handleSelectedStudent(studentName) }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        <ListSubheader
          sx={{
            position: "sticky",
            top: 0,
            borderBottom: 2,
            borderBlockStyle: "double",
            borderColor: "primary.dark",
            borderTop: 0,
          }}
        >{ selectedClass }</ListSubheader>
        {students.map((student, index) => (
          <ListItemButton key={index} onClick={() => onStudentClick(student)}>
            <ListItemText>{student}</ListItemText>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default StudentsDrawer;
