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
      nikename: "art ",
      image: "Images/logo.png",
    },
    {
      userName: "sasr",
      password: "sar123",
      nikename: "ssaa ",
      image: "Images/logo.png",
    },
    {
      userName: "ilona",
      password: "ilo19",
      nikename: "anoli ",
      image: "Images/logo.png",
    },
  ]);

  var [recipients, setRecipients] = useState([
    {
      userName: "artiom",
      recipientsList: ["art1", "sasr", "ilona"],
    },
  ]);

  var [chats, setChats] = useState([
    {
      recipients: ["artiom", "sasr"],
      texts: [
        { name: "art1", type: "text", message: "hi" },
        { name: "sasr", type: "text", message: "lol" },
        { name: "art1", type: "text", message: "hi2" },
      ],
    },
    {
      recipients: ["ilona", "sasr"],
      texts: [
        { name: "art1", type: "image", message: "./images/logo.png" },
        { name: "art1", type: "text", message: "hi" },
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
            <Route exact path="/" element={<Login users={users} />} />
            <Route
              exact
              path="/chat"
              element={
                <ChatApp
                  loginUser={loginUser}
                  setLoginUser={setLoginUser}
                  users={users}
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
