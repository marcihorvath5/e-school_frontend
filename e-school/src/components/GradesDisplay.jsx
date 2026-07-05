import * as React from "react";
import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import useDataStore from "../dataStore/DataStore";
import GradeChip from "./GradeChip";
import AddIcon from "@mui/icons-material/Add";

function GradesDisplay({ studentName }) {
  const subjects = useDataStore((state) => state.subjects);
  const students = useDataStore((state) => state.students);
  const selectedStudentId = useDataStore((state) => state.selectedStudentId);
  const student = students.find((s) => s.id === selectedStudentId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newGradeValue, setNewGradeValue] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <>
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

                <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
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
                    {studentGrades.map((grades) =>
                      grades.grades.map((grade) => (
                        <GradeChip key={grade.gradeId} grade={grade} />
                      ))
                    )}
                  </Box>

                  <IconButton
                    onClick={() => setDialogOpen(true)}
                    sx={{
                      border: 1,
                      borderColor: "divider",
                      borderRadius: 0,
                    }}
                  >
                    <AddIcon fontSize="large" color="success" />
                  </IconButton>
                </Box>

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
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Jegy felvitel</DialogTitle>
        <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth>
            <InputLabel>Jegy</InputLabel>
            <Select
              value={newGradeValue}
              label="Jegy"
              onChange={(e) => setNewGradeValue(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
              ;
            </Select>
          </FormControl>
          <Box>
            <Button>Mégsem</Button>
            <Button>Hozzáad</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GradesDisplay;
