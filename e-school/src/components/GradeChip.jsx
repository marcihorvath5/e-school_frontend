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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

function GradeChip({ grade }) {
  const selectedStudentId = useDatastore((state) => state.selectedStudentId);
  const [hovered, setHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editValue, setEditValue] = useState(grade.gradeValue);
  const deleteGrade = useDatastore((state) => state.deleteGrade);
  const updateGrade = useDatastore((state) => state.updateGrade);

  const openEditDialog = () => {
    setEditValue(grade.gradeValue);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => setEditDialogOpen(false);

  const handleUpdate = async () => {
    if (editValue === grade.gradeValue) return closeEditDialog();
    await updateGrade(grade.gradeId, editValue);
    closeEditDialog();
  };

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
            <IconButton onClick={openEditDialog}>
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
      <Dialog open={editDialogOpen} onClose={closeEditDialog}>
        <DialogTitle>Jegy módosítása</DialogTitle>
        <DialogActions sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl fullWidth>
            <InputLabel>Jegy</InputLabel>
            <Select
              value={editValue}
              label="Jegy"
              onChange={(e) => setEditValue(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <MenuItem key={n} value={n}>
                  {n}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Button onClick={closeEditDialog}>Mégse</Button>
            <Button onClick={handleUpdate}>Mentés</Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default GradeChip;
