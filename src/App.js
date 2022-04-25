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
      image: "images/logo.png",
      recipientsList: ["sasr"],
    },
    {
      userName: "sasr",
      password: "sar123",
      nikename: "ssaa",
      image: "Images/image2.jpg",
      recipientsList: ["artiom", "ilona"],
    },
    {
      userName: "ilona",
      password: "ilo19",
      nikename: "anoli",
      image: "Images/image3.png",
      recipientsList: ["sasr"],
    },
    {
      userName: "Bogos Binted",
      password: "sss",
      nikename: "Bogos",
      image: "Images/image4.png",
      recipientsList: [],
    },
    {
      userName: "monsoon",
      password: "eee",
      nikename: "monsoon",
      image: "Images/image5.png",
      recipientsList: ["sasr", "artiom", "ilona", "Bogos Binted"],
    },
  ]);

  var [chats, setChats] = useState([
    {
      recipients: ["sasr", "artiom"],
      texts: [
        { name: "artiom", type: "text", message: "hi", time: "16:45" },
        { name: "sasr", type: "text", message: "lol", time: "10:45"},
        { name: "artiom", type: "text", message: "hi2", time: "06:35" },
      ],
    },
    {
      recipients: ["ilona", "sasr"],
      texts: [
        { name: "ilona", type: "image", message: "Images/logo.png", time:"07:38" },
        { name: "ilona", type: "text", message: "hi", time:"12:00" },
      ],
    },
    {
      recipients: ["monsoon", "sasr"],
      texts: [
        { name: "monsoon", type: "text", message: "AMUGUS", time:"14:29" },
        { name: "sasr", type: "text", message: "logo", time:"03:59" },
      ],
    },
    {
      recipients: ["monsoon", "ilona"],
      texts: [
        { name: "monsoon", type: "text", message: "AMUGUS", time:"04:20" },
        { name: "ilona", type: "text", message: "logo", time:"07:30" },
      ],
    },
    {
      recipients: ["monsoon", "artiom"],
      texts: [
        { name: "monsoon", type: "text", message: "AMUGUS", time: "09:17" },
        { name: "artiom", type: "text", message: "logo", time: "11:47" },
      ],
    },
    {
      recipients: ["monsoon", "Bogos Binted"],
      texts: [
        { name: "monsoon", type: "text", message: "And it will come", time: "08:00" },
        { name: "monsoon", type: "text", message: "like a flood of pain", time: "09:00" },
        { name: "monsoon", type: "text", message: "pouring down on me", time: "10:00" },
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
