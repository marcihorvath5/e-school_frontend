import * as React from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function LoginPage({ Email = "pelda@pelda.hu" }) {
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
        <TextField fullWidth label="Email" type="email" sx={{ mt: 2 }} />
        <TextField fullWidth label="Jelszó" type="password" sx={{ mt: 1 }} />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Bejelentkezés
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginPage;
