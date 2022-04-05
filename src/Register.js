import { Button } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Register(props) {
  const navigate = useNavigate();
  var [userName, setUserName] = useState("");
  var [password, setPassword] = useState("");
  var [nickname, setNickname] = useState("");

  function checkIfUserExist() {
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName == userName) {
        return;
      }
      i++;
    }
    addUser();
    navigate("/");
  }

  function addUser() {
    var temp = { userName: userName, nickname: nickname, password: password };
    props.setUsers([...props.users, temp]);
    console.log(props.users);
  }

  return (
    <div className="Register">
      <h1>Register Page</h1>
      <form>
        <div className="form-group">
          <label>User Name</label>
          <br />
          <input
            type="text"
            className="form-control-sm"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nickname</label>
          <br />
          <input
            type="text"
            className="form-control-sm"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <br />
          <input
            type="password"
            className="form-control-sm"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <Button variant="primary" onClick={checkIfUserExist}>
          Sign Up
        </Button>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </form>
    </div>
  );
}

export default Register;
