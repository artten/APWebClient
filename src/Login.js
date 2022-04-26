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
      <h1>Login</h1>
      <br/>
      <h6>
        User name:{" "}
      </h6>
      <input
          type="text"
          id="user_name"
          className="form-control-sm"
          placeholder="Enter your user name"
          value={logUserName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <br/>
        <br/>
      <h6>
        Password:{" "}
      </h6>
      <input
          type="password"
          id="password"
          className="form-control-sm"
          placeholder="Enter password"
          value={LogPassword}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br/>
        <br/>
      <button class="btn btn-primary" onClick={checkLoginInfo}>
        Login
      </button>
      <br />
      <br />
      <button class="btn btn-secondary"
        onClick={() => {
          navigate("/register");
        }}
      >
        No account? Register now!
      </button>
      <br />
      <br />
      <button class="btn btn-secondary" onClick={loadImg}>
        Forgot password? TOO BAD
      </button>
      <div class="butwhydou" id="butwhydou"></div>
      <div class="errorText" id="errorText"></div>
    </div>
  );
}
export default Login;
