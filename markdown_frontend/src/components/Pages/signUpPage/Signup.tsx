// Signup.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css"; // Import CSS file

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const data = {
      email,
      password,
      username,
    };
    const res = await fetch("http://localhost:8000/users/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await res.json();
    console.log(resJson);
    if (resJson.status == "ok") {
      navigate("/login");
    } else {
      alert("Something went wrong! Enter valid email and password!");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
