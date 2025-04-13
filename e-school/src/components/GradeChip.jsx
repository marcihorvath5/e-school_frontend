import useDatastore from "../dataStore/DataStore";
import { useState } from "react";
import {
  Chip,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function GradeChip({ grade }) {
  const selectedStudentId = useDatastore((state) => state.selectedStudentId);
  const [hovered, setHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const deleteGrade = useDatastore((state) => state.deleteGrade);

  return (
    <>
      <Box
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{ display: "inline-flex", position: "relative" }}
      >
        <Chip
          label={grade.gradeValue}
          size="small"
          sx={{
            m: 1,
            backgroundColor:
              grade.gradeValue >= 4
                ? "success.main"
                : grade.gradeValue === 3
                  ? "warning.main"
                  : "error.main",
            color: "white",
          }}
        />

        {hovered && (
          <Box>
            <IconButton>
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => setDialogOpen(true)}>
              <DeleteForeverOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Biztosan törölni kívánja a jegyet?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Mégse</Button>
          <Button
            onClick={() => {
              deleteGrade(grade.gradeId, selectedStudentId),
                setDialogOpen(false);
            }}
            color="error"
          >
            Törlés
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GradeChip;
