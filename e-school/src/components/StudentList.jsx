import * as React from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function StudentList({
  onStudentClick = handleSelectedStudent(studentName),
  selectedClassName,
  students = [],
}) {
  return (
    <List
      sx={{
        display: "flex",
        boxShadow: 1,
        bgcolor: "background.paper",
        color: "text.primary",
        position: "relative",
        overflowY: "auto",
        overflowX: "Auto",
        height: `100%`,
        "& ul": { padding: 0 },
        "&::-webkit-scrollbar": { width: 8 },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "primary.dark",
          borderRadius: 3,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.light",
          borderRadius: 3,
        },
      }}
      subheader={<li />}
    >
      <li>
        <ul>
          <ListSubheader
            sx={{
              position: "sticky",
              top: 0,
              borderBottom: 2,
              borderBlockStyle: "double",
              borderColor: "primary.dark",
              borderTop: 0,
            }}
          >
            {selectedClassName}
          </ListSubheader>
          {students.map((student, index) => (
            <ListItemButton
              onClick={() => onStudentClick(student)}
              key={index}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                  flexGrow: 1,
                },
              }}
            >
              <ListItemText primary={student} sx={{ p: 1 }} />
            </ListItemButton>
          ))}
        </ul>
      </li>
    </List>
  );
}

export default StudentList;
