import React, { useState } from "react";
import axios from "axios";
import "./userForm.css";

interface UserFormProps {
  token1: React.MutableRefObject<null>;
}

const UserForm: React.FC<UserFormProps> = ({ token1 }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");
  const [dobError, setDobError] = useState<string>("");
  const [msgAlert, setAlert] = useState("");

  const logout = () => {
    token1.current = null;
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await validateFirstName(firstName);
    await validateLastName(lastName);
    await validatePhoneNumber(phoneNumber);
    await validateDob(dob);

    if (!firstNameError && !lastNameError && !phoneNumberError && !dobError) {
      try {
        let response = await axios.post(
          "http://127.0.0.1:8000/save-customer/",
          {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            date_of_birth: dob,
          },
          { headers: { Authorization: `Token ${token1.current}` } }
        );

        if (response.status === 201) {
          setAlert("Data Saved");
        } else {
          setAlert("Error Saving data");
        }
      } catch (e) {
        console.log("error");
        setAlert("Error Saving data");
      }

      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setDob("");
    }
  };

  const validateFirstName = (value: string) => {
    if (!value) {
      setFirstNameError("First name is required");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = (value: string) => {
    if (!value) {
      setLastNameError("Last name is required");
    } else {
      setLastNameError("");
    }
  };

  const validatePhoneNumber = async(value: string) => {
    const phoneNumberRegex = /^\d{10}$/; // Regular expression to match exactly 10 digits
    if (!value) {
      setPhoneNumberError("Phone number is required");
    } else if (!phoneNumberRegex.test(value)) {
      setPhoneNumberError("Please enter a 10-digit phone number");
    } else {
      setPhoneNumberError("");
    }
  };

  const validateDob = (value: string) => {
    if (!value) {
      setDobError("Date of Birth is required");
    } else {
      setDobError("");
    }
  };

  return (
    <div className="user-form">
      <h2>Enter Your Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={(e) => validateFirstName(e.target.value)}
          />
          {firstNameError && <p className="error-message">{firstNameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={(e) => validateLastName(e.target.value)}
          />
          {lastNameError && <p className="error-message">{lastNameError}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onBlur={(e) => validatePhoneNumber(e.target.value)}
          />
          {phoneNumberError && (
            <p className="error-message">{phoneNumberError}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            onBlur={(e) => validateDob(e.target.value)}
          />
          {dobError && <p className="error-message">{dobError}</p>}
        </div>
        <button type="submit">Submit</button>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
            {msgAlert?<span
          style={{
            display: "block",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "10px",
            marginTop: "10px",
            border: "1px solid #f5c6cb",
            borderRadius: "5px",
          }}
        >
          {msgAlert}
        </span>:null}
        
      </form>
    </div>
  );
};

export default UserForm;
