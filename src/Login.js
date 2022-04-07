import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  var [logUserName, setUserName] = useState("");
  var [LogPassword, setPassword] = useState("");
  console.log(props.users);

  function checkLoginInfo() {
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === logUserName) {
        if (temp[i].password === LogPassword){
          navigate("/ChatApp");
          return;
        }
        else {
          document.write("wrong");
        }
      }
      i++;
    }
    document.write("no");
  }

  return (
    <div style={{ textAlign: "center" }} className="Login">
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
          type="text"
          id="password"
          placeholder="Enter password"
          value={LogPassword}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
      </h1>
      <button
        style={{ color: "pink" }}
        onClick={checkLoginInfo}
      >
        Login
      </button>

      <button
        style={{ color: "pink" }}
        onClick={() => {
          navigate("/regiseter");
        }}
      >
        No account? Register now!
      </button>

      <button
        style={{ color: "pink" }}
      >
        Forgot password? TOO BAD
      </button>
    </div>
  );
}

export default Login;
