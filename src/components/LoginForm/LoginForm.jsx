import React, { useContext } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { AlertContext } from "../../contextApi/AlertContextApi";
import axios from "axios";
import dev from "../../config";
import { AuthContext } from "../../contextApi/UserContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { setAlertOpen, setSeverity, setAlertMessage } =
    useContext(AlertContext);
  const { setAuthUser } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const user = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await axios.post(
        `${dev.serverUrl}/api/users/login`,
        user
      );
      if (response.data.success) {
        setAlertOpen(true);
        setSeverity("success");
        setAlertMessage(response.data.message);
        setAuthUser(response.data.user);
        localStorage.setItem(
          "user",
          JSON.stringify({ _id: response.data.user._id })
        );
        reset();
        navigate("/", { replace: true });
      } else {
        setAlertOpen(true);
        setSeverity("error");
        setAlertMessage(response.data.message);
      }
    } catch (error) {
      setAlertOpen(true);
      setSeverity("error");
      setAlertMessage(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit(handleLogin)}
          style={{ width: "100%", marginTop: 20 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                {...register("email")}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                {...register("password")}
                required
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
