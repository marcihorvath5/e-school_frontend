import * as React from "react";
import { Box, Chip, Typography } from "@mui/material";

function GradesDisplay({gradesBySubject = [], studentName }) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 2,
        boxShadow: 1,
        position: "relative",
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center" }}>
        {studentName} jegyei
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
        {gradesBySubject.map(({ subject, grades }) => {
          const avg =
            grades.reduce((sum, g) => sum + g.value, 0) / grades.length || 0;

          return (
            <React.Fragment key={subject}>
              <Box
                sx={{
                  fontWeight: "bold",
                  border: 1,
                  borderColor: "divider",
                  display: "flex",
                  alignItems: "center",
                  p: 1,
                }}
              >
                {subject}
              </Box>
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
                {grades.map((grade, index) => (
                  <Chip
                    key={index}
                    label={grade.value}
                    size="small"
                    sx={{
                      m: 1,
                      backgroundColor:
                        grade.value >= 4
                          ? "success.main"
                          : grade.value === 3
                            ? "warning.main"
                            : "error.main",
                      color: "white",
                    }}
                  />
                ))}
              </Box>
              <Box
                sx={{
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
