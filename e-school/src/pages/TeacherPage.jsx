import * as React from "react";
import { useState, useEffect } from "react";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import AppNav from "../components/AppNav";
import StudentList from "../components/StudentList";
import GradesDisplay from "../components/GradesDisplay";
import StudentsDrawer from "../components/StudentsDrawer";
import useDataStore from "../dataStore/DataStore";

const gradesBySubject = [
  {
    subject: "Informatika",
    grades: [{ value: 5 }, { value: 4 }, { value: 3 }],
  },
  {
    subject: "Testnevelés",
    grades: [{ value: 5 }, { value: 4 }, { value: 3 }],
  },
  {
    subject: "Biológia",
    grades: [{ value: 5 }, { value: 4 }, { value: 3 }],
  },
  {
    subject: "Fizika",
    grades: [],
  },
  {
    subject: "Matematika",
    grades: [],
  },
  {
    subject: "Történelem",
    grades: [{ value: 3 }, { value: 3 }, { value: 4 }, { value: 5 }],
  },
];

const students = [
  "Sehallselát Dömötör",
  "Tanuló 2",
  "Tanuló 3",
  "Tanuló 4",
  "Tanuló 5",
  "Tanuló 6",
  "Tanuló 7",
  "Tanuló 8",
  "Tanuló 9",
  "Tanuló 10",
  "Tanuló 11",
  "Tanuló 12",
  "Tanuló 13",
  "Tanuló 14",
  "Tanuló 15",
  "Tanuló 16",
  "Tanuló 17",
  "Tanuló 18",
];

const classes = ["12.A", "12.B", "12.C"];

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
      <AppNav
        classes={classes}
        onClassClick={(className) => handleSelectedClass(className)}
        onMenuClick={() => setDrawerOpen(true)}
        isMobile={isMobile}
      />

      {isMobile && (
        <StudentsDrawer
          selectedClass={selectedClass}
          onStudentClick={(studentName) => handleSelectedStudent(studentName)}
          open={drawerOpen}
          onClose={handleDrawerToggle}
          students={students}
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
            students={students}
          />
        )}
        {selectedStudentId && <GradesDisplay />}
      </Box>
    </Box>
  );
}

export default TeacherPage;
