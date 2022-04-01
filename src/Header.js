import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <h2 style={{ textAlign: "center", backgroundColor: "#02F173" }}>
        ChatApp
      </h2>
    </div>
  );
}

export default Header;
