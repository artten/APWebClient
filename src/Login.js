import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  return (
    <div className="Login">
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
