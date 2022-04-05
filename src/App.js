import "./App.css";
import Login from "./Login";
import ChatApp from "./ChatApp";
import Register from "./Register";
import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([
    { userName: "artiom", password: "art1", nikename: "art " },
    { userName: "sasr", password: "sar123", nikename: "ssaa " },
  ]);

  return (
    <div>
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#6CDE27",
          height: "96vh",
        }}
      >
        <Router>
          <Header></Header>
          <Routes>
            <Route exact path="/" element={<Login users={users} />} />
            <Route exact path="/chat" element={<ChatApp />} />
            <Route
              exact
              path="/register"
              element={<Register users={users} setUsers={setUsers} />}
            />
          </Routes>
        </Router>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
