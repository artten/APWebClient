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
    {
      userName: "artiom",
      password: "art1",
      nikename: "art",
      image: "Images/logo.png",
      recipientsList: ["sasr"],
    },
    {
      userName: "sasr",
      password: "sar123",
      nikename: "ssaa",
      image: "Images/logo.png",
      recipientsList: ["artiom", "ilona"],
    },
    {
      userName: "ilona",
      password: "ilo19",
      nikename: "anoli",
      image: "Images/logo.png",
      recipientsList: ["sasr"],
    },
    {
      userName: "Bogos Binted",
      password: "sss",
      nikename: "Bogos",
      image: "Images/logo.png",
      recipientsList: [],
    },
    {
      userName: "monsoon",
      password: "eee",
      nikename: "monsoon",
      image: "Images/logo.png",
      recipientsList: ["sasr", "artiom", "ilona", "Bogos Binted"],
    },
  ]);

  var [chats, setChats] = useState([
    {
      recipients: ["sasr", "artiom"],
      texts: [
        { name: "artiom", type: "text", message: "hi" },
        {
          name: "sasr",
          type: "text",
          message: "lol",
        },
        { name: "artiom", type: "text", message: "hi2" },
      ],
    },
    {
      recipients: ["ilona", "sasr"],
      texts: [
        { name: "ilona", type: "image", message: "Images/logo.png" },
        { name: "ilona", type: "text", message: "hi" },
      ],
    },
    {
      recipients: ["monsoon", "sasr"],
      texts: [
        { name: "monsoon", type: "text", message: "AMUGUS" },
        { name: "sasr", type: "text", message: "logo" },
      ],
    },
    {
      recipients: ["monsoon", "ilona"],
      texts: [
        { name: "monsoon", type: "text", message: "AMUGUS" },
        { name: "ilona", type: "text", message: "logo" },
      ],
    },
    {
      recipients: ["monsoon", "artiom"],
      texts: [
        { name: "monsoon", type: "text", message: "AMUGUS" },
        { name: "artiom", type: "text", message: "logo" },
      ],
    },
    {
      recipients: ["monsoon", "Bogos Binted"],
      texts: [
        { name: "monsoon", type: "text", message: "And it will come" },
        { name: "monsoon", type: "text", message: "like a flood of pain" },
        { name: "monsoon", type: "text", message: "pouring down on me" },
      ],
    },
  ]);

  var [loginUser, setLoginUser] = useState({ loginUser: "" });

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
            <Route
              exact
              path="/"
              element={
                <Login
                  users={users}
                  loginUser={loginUser}
                  setLoginUser={setLoginUser}
                />
              }
            />
            <Route
              exact
              path="/chat"
              element={
                <ChatApp
                  loginUser={loginUser}
                  setLoginUser={setLoginUser}
                  users={users}
                  setUsers={setUsers}
                  chats={chats}
                  setChats={setChats}
                />
              }
            />
            <Route
              exact
              path="/register"
              element={
                <Register
                  users={users}
                  setUsers={setUsers}
                  loginUser={loginUser}
                  setLoginUser={setLoginUser}
                />
              }
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
