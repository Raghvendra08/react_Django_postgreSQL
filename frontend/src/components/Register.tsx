import React, { useState } from "react";
import axios from "axios";
interface RegisterProps {
  setShowRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<RegisterProps> = ({ setShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validateEmail = (value: string) => {
    if (!value) {
      setEmailError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordError("Password is required");
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validatePhoneNumber = (value: string) => {
    const phoneNumberRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits
    if (!value) {
      setPhoneNumberError("Phone number is required");
    } else if (!phoneNumberRegex.test(value)) {
      setPhoneNumberError("Please enter a 10-digit phone number");
    } else {
      setPhoneNumberError("");
    }
  };

  const handleRegister = async () => {
    validateEmail(email);
    validatePassword(password);
    validatePhoneNumber(phoneNumber);

    if (!emailError && !passwordError && !phoneNumberError) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/registeruser/", {
          username:email,
          password,
          phoneNumber,
        });
        console.log(response.data); // Assuming response contains user data or token
        if (Object.keys(response.data).includes("token"))
        {
          // You can redirect to another page upon successful registration if needed
          setError(""); // Clear any previous error messages
          setSuccess("Registration Successful.");
        }
        else{
          let errorarray = Object.keys(response.data)
          setSuccess("")
          setError(response.data[errorarray[0]][0])
          console.log("Registration ", response.data[errorarray[0]][0]);
        }

      } catch (error) {

        let test = JSON.parse(JSON.stringify(error))
        console.log("Registration failed", test);
        setError("Registration failed. Please try again."); // Set error message
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <div className="form-group">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e) => validateEmail(e.target.value)}
        />
        {emailError && <p className="error-message">{emailError}</p>}
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={(e) => validatePassword(e.target.value)}
        />
        {passwordError && <p className="error-message">{passwordError}</p>}
      </div>
      <div className="form-group">
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          onBlur={(e) => validatePhoneNumber(e.target.value)}
        />
        {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
      </div>
      <div className="form-group">
        <button onClick={handleRegister}>Register</button>
      </div>
      {success?<p className="success-message">{success}</p>:<p className="error-message">{error}</p>}
      <p>
        Already have an account?{" "}
        <span
          onClick={() => {
            setShowRegister(false);
          }}
          className="link"
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;
