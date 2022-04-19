import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className="Header">
      <h2>
        ChatApp
      </h2>
    </div>
  );
}

export default Header;
