import React, { useRef, useState } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import Register from "./Register";
import { Typography, TextField, Button } from "@mui/material";
import "./Login.css"; // Import the CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const token = useRef(null);

  const validateEmail = (value: string) => {
    if (!value) {
      setError("Email is required");
      return false;
    }
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login/", {
          username: email,
          password,
        });
        console.log(response.data); // Assuming response contains user data or token
        if (response.data.token) {
          token.current = response.data.token;
          setShowScreen(true);
        }

        // You can redirect to another page upon successful login if needed
        setError(""); // Clear any previous error messages
      } catch (error) {
        console.error("Login failed", error);
        setError("Invalid email or password"); // Set error message
      }
    }
  };

  const handleSignUpClick = () => {
    setShowRegister(true);
  };

  return (
    <div className={"login-container"}>
      <div className={showRegister || showScreen ? "" : "login-form"}>
        {showRegister ? (
          <Register setShowRegister={setShowRegister} />
        ) : (
          <>
            {!showScreen && (
              <>
                <Typography variant="h2">Login</Typography>
                <div className="form-group">
                  <TextField
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(error)}
                    helperText={error}
                  />
                </div>
                <div className="form-group">
                  <TextField
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(error)}
                    helperText={error}
                  />
                </div>
                <div className="form-group">
                  <Button variant="contained" color="primary" onClick={handleLogin}>
                    Login
                  </Button>
                </div>
                <Typography variant="body1" className="error-message">
                  {error}
                </Typography>
                <Typography variant="body1">
                  Don't have an account?{" "}
                  <span onClick={handleSignUpClick} className="link-button">
                    Sign up
                  </span>
                </Typography>
              </>
            )}
            {showScreen && <UserForm token1={token} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
