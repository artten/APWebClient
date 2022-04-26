import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  var [logUserName, setUserName] = useState("");
  var [LogPassword, setPassword] = useState("");

  function checkLoginInfo() {
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === logUserName) {
        if (temp[i].password === LogPassword) {
          props.setLoginUser({ loginUser: logUserName });
          navigate("/chat");
          return;
        } else {
          //document.getElementById("errorText").style.display = "block"
          document.getElementById("errorText").innerHTML = "wrong password";
          return;
        }
      }
      i++;
    }
    document.getElementById("errorText").innerHTML = "User does not exist";
  }

  function loadImg() {
    document.getElementById("errorText").innerHTML =
      '<img width="300" height="261" align="right" src="https://i.pinimg.com/originals/f7/a4/bd/f7a4bd3aca721ca3d84ac8218fd1f697.jpg"></img>';
    return;
  }

  return (
    <div style={{ textAlign: "center" }} className="Login" id="Login">
      <p>Login </p>

      <h1 style={{ color: "pink" }}>
        User name:{" "}
        <input
          style={{ backgroundColor: "pink" }}
          type="text"
          id="user_name"
          placeholder="Enter your user name"
          value={logUserName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
      </h1>

      <h1 style={{ color: "pink" }}>
        Password:{" "}
        <input
          style={{ backgroundColor: "pink" }}
          type="password"
          id="password"
          placeholder="Enter password"
          value={LogPassword}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </h1>
      <button style={{ color: "pink" }} onClick={checkLoginInfo}>
        Login
      </button>

      <button
        style={{ color: "pink" }}
        onClick={() => {
          navigate("/register");
        }}
      >
        No account? Register now!
      </button>

      <button style={{ color: "pink" }} onClick={loadImg}>
        Forgot password? TOO BAD
      </button>
      <div class="butwhydou" id="butwhydou" style={{ color: "red" }}></div>
      <div class="errorText" id="errorText" style={{ color: "red" }}></div>
    </div>
  );
}
export default Login;
