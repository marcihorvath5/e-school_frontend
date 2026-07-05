import * as React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import AppNav from "../components/AppNav";
import StudentList from "../components/StudentList";
import GradesDisplay from "../components/GradesDisplay";
import StudentsDrawer from "../components/StudentsDrawer";
import useDataStore from "../dataStore/DataStore";

function TeacherPage(params) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const selectedClass = useDataStore((state) => state.selectedClass);
  const selectedStudentId = useDataStore((state) => state.selectedStudentId);

  useEffect(() => {}, [selectedClass]);

  const handleSelectedStudent = (selectedStudentName) =>
    setSelectedStudent(selectedStudentName);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppNav isMobile={isMobile} />

      {isMobile && (
        <StudentsDrawer
          selectedClass={selectedClass}
          onStudentClick={(studentName) => handleSelectedStudent(studentName)}
          open={drawerOpen}
          onClose={handleDrawerToggle}
        />
      )}

      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          display: "flex",
          overflow: "hidden",
        }}
      >
        {!isMobile && selectedClass && (
          <StudentList
            selectedClassName={selectedClass}
            onStudentClick={(studentName) => handleSelectedStudent(studentName)}
          />
        )}
        {selectedStudentId && <GradesDisplay />}
      </Box>
    </Box>
  );
}

export default TeacherPage;
