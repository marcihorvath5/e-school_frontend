import * as React from "react";
import { useState } from "react";
import StudentDrawer from "../components/StudentsDrawer";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function AppNav({
  onClassClick = handleSelectedClass(selectedClassName),
  isMobile,
  onMenuClick,
  classes = [],
}) {
  return (
    <AppBar sx={{ width: "100vw", position: "sticky" }}>
      <Toolbar>
        {isMobile && (
          <IconButton onClick={onMenuClick} edge="start">
            <MenuIcon />
          </IconButton>
        )}
        <Typography sx={{ flexGrow: 1, ml: 1 }}>Tanári felület</Typography>
        <Button variant="contained" sx={{ color: "inherit", mr: 1 }}>
          Kijelentkezés
        </Button>
      </Toolbar>
      <Box
        sx={{
          p: 1,
          overflowX: "auto",
          backgroundColor: "primary.dark",
          whiteSpace: "nowrap",
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "primary.dark",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.light",
            borderRadius: 3,
          },
        }}
      >
        {classes.map((className) => (
          <Button
            onClick={() => {
              onClassClick(className);
            }}
            key={className}
            color="inherit"
          >
            {className}
          </Button>
        ))}
      </Box>
    </AppBar>
  );
}

export default AppNav;
