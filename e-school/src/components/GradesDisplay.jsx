import * as React from "react";
import { Box, Chip, Typography } from "@mui/material";
import useDataStore from "../dataStore/DataStore";

function GradesDisplay({ studentName }) {
  const subjects = useDataStore((state) => state.subjects);
  const students = useDataStore((state) => state.students);
  const selectedStudentId = useDataStore((state) => state.selectedStudentId);
  const student = students.find((s) => s.id === selectedStudentId);

  return (
    <Box
      sx={{
        bgcolor: "white",
        flexGrow: 1,
        p: 2,
        boxShadow: 1,
        position: "relative",
        overflowY: "auto",
      }}
    >
      <Typography
        variant="h5"
        sx={{ color: "black", textAlign: "center", paddingBottom: 2 }}
      >
        {student.lastName} {student.firstName}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 6fr 1fr" },
          flexGrow: 1,
          alignItems: "stretch",
          rowGap: 2,
        }}
      >
        {subjects.map((subject, index) => {
          const studentGrades = student.grades.filter(
            (s) => s.subjectName === subject
          );
          console.log(studentGrades);
          const allGrades = studentGrades.flatMap((g) => g.grades);
          const sum = allGrades.reduce(
            (acc, grade) => grade.gradeValue + acc,
            0
          );
          const avg = allGrades.length > 0 ? sum / allGrades.length : 0;

          return (
            <React.Fragment key={index}>
              <Box
                sx={{
                  color: "black",
                  border: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                }}
              >
                {subject}
              </Box>
              {
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "nowrap",
                    overflowX: "auto",
                    gap: 1,
                    border: 1,
                    borderColor: "divider",
                    "&::-webkit-scrollbar": { height: 6 },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "primary.dark",
                      borderRadius: 0,
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "primary.light",
                      borderRadius: 3,
                    },
                  }}
                >
                  {studentGrades.map((grades, index) =>
                    grades.grades.map(
                      (grade, index) => (
                        console.log(allGrades),
                        (
                          <Chip
                            key={index}
                            label={grade.gradeValue}
                            size="small"
                            sx={{
                              m: 1,
                              backgroundColor:
                                grade.gradeValue >= 4
                                  ? "success.main"
                                  : grade.Value === 3
                                    ? "warning.main"
                                    : "error.main",
                              color: "white",
                            }}
                          />
                        )
                      )
                    )
                  )}
                </Box>
              }
              <Box
                sx={{
                  color: "black",
                  border: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  pr: 5,
                }}
              >
                {avg.toFixed(2)}
              </Box>
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}

export default GradesDisplay;
