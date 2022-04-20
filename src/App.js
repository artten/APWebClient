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
      recipientsList: ["sasr"],
    },
    {
      userName: "sasr",
      password: "sar123",
      nikename: "ssaa ",
      image: "Images/logo.png",
      recipientsList: ["art1","ilona"],
    },
    {
      userName: "ilona",
      password: "ilo19",
      nikename: "anoli ",
      image: "Images/logo.png",
      recipientsList: ["sasr"],
    },
    {
      userName: "Bogos Binted",
      password: "sss",
      nikename: "Bogos",
      image: "Images/logo.png",
      recipientsList: ["Bogos Binted"],
    },
    {
      userName: "monsoon",
      password: "eee",
      nikename: "monsoon",
      image: "Images/logo.png",
      recipientsList: ["sasr","art1","ilona","Bogos Binted"],
    },
  ]);

  var [recipients, setRecipients] = useState([
    {
      userName: "artiom",
<<<<<<< HEAD
      recipientsList: ["sasr"],
    },
    {
      userName: "sasr",
      recipientsList: ["art1","ilona"],
    },
    {
      userName: "ilona",
      recipientsList: ["sasr"],
    },
    {
      userName: "Bogos Binted",
      recipientsList: ["Bogos Binted"],
    },
    {
      userName: "monsoon",
      recipientsList: ["sasr","art1","ilona","Bogos Binted"],
=======
      recipientsList: ["art1", "sasr", "ilona"],
>>>>>>> f3ee30f6ab3ce2997fe72ca4c06dd75ba148e4ea
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
    {
      recipients: ["monsoon","sasr"],
      texts: [{"monsoon":"AMUGUS"},{"sasr":"logo"},],
    },
    {
      recipients: ["monsoon","ilona"],
      texts: [{"monsoon":"AMUGUS"},{"ilona":"logo"},],
    },
    {
      recipients: ["monsoon","art1"],
      texts: [{"monsoon":"AMUGUS"},{"art1":"logo"},],
    },
    {
      recipients: ["monsoon","Bogos Binted"],
      texts: [{"monsoon":"And it will come"},{"monsoon":"like a flood of pain"},{"monsoon":"pouring down on me"}],
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
