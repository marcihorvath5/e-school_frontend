import * as React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useDatastore from "../dataStore/DataStore";

function LoginPage() {
  const { login, isAuthenticated } = useDatastore();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/teacher");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (e) {
      console.log("Hoppá valami hiba történt:", e);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 4, width: "30%", height: "50%" }} elevation={3}>
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Bejelentkezés
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Email"
            type="email"
            sx={{ mt: 2 }}
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Jelszó"
            type="password"
            sx={{ mt: 1 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Bejelentkezés
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginPage;
