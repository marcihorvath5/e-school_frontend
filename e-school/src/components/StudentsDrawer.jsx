import * as React from "react";
import { List, ListItemText, ListItem, Drawer } from "@mui/material";

function StudentsDrawer({ open, onClose, students = [] }) {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      sx={{ overflowX: "auto", width: "100vw", height: "100vh" }}
    >
      <List>
        {students.map((student, index) => (
          <ListItem key={index}>
            <ListItemText>{student}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default StudentsDrawer;
