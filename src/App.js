import "./App.css";
import Login from "./Login";
import ChatApp from "./ChatApp";
import Register from "./Register";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/chat" element={<ChatApp />} />
          <Route exact path="/reg" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
