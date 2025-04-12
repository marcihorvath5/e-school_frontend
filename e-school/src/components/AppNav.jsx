import * as React from "react";
import { useState, useEffect } from "react";
import StudentDrawer from "../components/StudentsDrawer";
import useDatastore from "../dataStore/DataStore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function AppNav({ isMobile, onMenuClick }) {
  const classes = useDatastore((state) => state.classes);
  const logout = useDatastore((state) => state.logout);
  const fetchClassWithStudents = useDatastore(
    (state) => state.fetchClassWithStudent
  );

  const handleLogout = (e) => {
    try {
      logout();
    } catch (e) {
      console.log(e);
    }
  };

  const handleClassSelect = async (className) => {
    try {
      await fetchClassWithStudents(className);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AppBar sx={{ width: "100vw", position: "sticky" }}>
      <Toolbar>
        {isMobile && (
          <IconButton onClick={onMenuClick} edge="start">
            <MenuIcon />
          </IconButton>
        )}
        <Typography sx={{ flexGrow: 1, ml: 1 }}>Tanári felület</Typography>
        <Button
          onClick={handleLogout}
          variant="contained"
          sx={{ color: "inherit", mr: 1 }}
        >
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
        {classes.map((item) => (
          <Button
            onClick={() => handleClassSelect(item.name)}
            key={item.name}
            color="inherit"
          >
            {item.name}
          </Button>
        ))}
      </Box>
    </AppBar>
  );
}

export default AppNav;
