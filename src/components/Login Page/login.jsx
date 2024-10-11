import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import wrench from "../../assets/wrench.png";
import { fn_login } from "./fn_login";
function HomePage() {
  const {
    loginId,
    setLoginId,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    isLoading,
    setIsLoading,
    handlePasswordChange,
    togglePasswordVisibility,
    handleLogin2,
  } = fn_login();
  return (
    <div>
      <Grid container spacing={2} style={{ paddingTop: "13%" }}>
        <Grid item xs={12} sm={6}>
          <div
            style={{
              marginLeft: "30%",
              marginTop: "7%",
              display: "flex",
              textAlign: "start",
              flexDirection: "column",
            }}
          >
            <h1
              style={{ color: "	#1E90FF", fontWeight: "bold", fontSize: "50px" }}
            >
              SE Service System <img src={wrench} width={40} height={40} />
            </h1>
            <p style={{ fontSize: "24px", margin: "auto" }}>
              Spare Parts Inventory{" "}
            </p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              width: 400,
              height: 230,
              marginLeft: 10,
              boxShadow: "0 16px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <TextField
              style={{
                marginLeft: "5%",
                marginTop: "5%",
                width: "360px",
              }}
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              id="outlined-multiline-flexible"
              label="Username"
              maxRows={10}
            />
            <TextField
              style={{
                marginLeft: "5%",
                marginTop: "2%",
                width: "360px",
                marginBottom: "10px",
              }}
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin2();
                }
              }}
            />
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Button
                variant="contained"
                style={{ width: "360px" }}
                onClick={handleLogin2}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Login"
                )}
              </Button>
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0rem",
              }}
            ></Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default HomePage;
