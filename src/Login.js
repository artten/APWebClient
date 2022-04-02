import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }} className="Login">
      <p>Login</p>
      <button
        onClick={() => {
          navigate("/reg");
        }}
      >
        Click
      </button>
    </div>
  );
}

export default Login;
