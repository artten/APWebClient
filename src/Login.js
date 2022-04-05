import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  console.log(props.users);
  return (
    <div style={{ textAlign: "center" }} className="Login">
      <p>Login </p>
      <h1 style={{ color: "pink" }}>
        User name:{" "}
        <input
          style={{ backgroundColor: "pink" }}
          type="text"
          id="user_name"
        ></input>
      </h1>
      <h1 style={{ color: "pink" }}>
        Password:{" "}
        <input
          style={{ backgroundColor: "pink" }}
          type="text"
          id="password"
        ></input>
      </h1>

      <button
        style={{ color: "pink" }}
        onClick={() => {
          navigate("/regiseter");
        }}
      >
        Click
      </button>
    </div>
  );
}

export default Login;
