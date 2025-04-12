import * as React from "react";
import {
  List,
  ListSubheader,
  ListItemButton,
  ListItemText,
  selectClasses,
} from "@mui/material";
import useDatastore from "../dataStore/DataStore";

function StudentList() {
  const { students, selectedClass, setSelectedStudentId } = useDatastore();

  const handleOnStudentClick = (id) => {
    setSelectedStudentId(id);
  };

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
            {selectedClass}
          </ListSubheader>
          {students.map((student) => (
            <ListItemButton
              onClick={() => handleOnStudentClick(student.id)}
              key={student.id}
              sx={{
                "&:hover": {
                  backgroundColor: "primary.light",
                  color: "white",
                  flexGrow: 1,
                },
              }}
            >
              <ListItemText
                primary={`${student.lastName} ${student.firstName}`}
                sx={{ p: 1 }}
              />
            </ListItemButton>
          ))}
        </ul>
      </li>
    </List>
  );
}

export default StudentList;
