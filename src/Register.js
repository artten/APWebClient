import { Button, Modal } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Register(props) {
  const navigate = useNavigate();
  var [userName, setUserName] = useState("");
  var [password, setPassword] = useState("");
  var [nickname, setNickname] = useState("");
  var [modal, setModal] = useState({
    text: "",
    visability: false,
  });

  useEffect(() => {}, [props.loginUser], [props.users]);

  function checkIfUserExist() {
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === userName) {
        return;
      }
      i++;
    }

    if (userName.length > 2 && nickname.length > 2) {
      var re = new RegExp("^([a-z0-9A-Z]{5,})$");
      if (re.test(password)) {
        props.setLoginUser({ loginUser: userName });
        addUser();
        navigate("/chat");
      }
    }
  }

  function addUser() {
    var temp = { userName: userName, nickname: nickname, password: password };
    props.setUsers([...props.users, temp]);
    console.log(props.users);
  }

  console.log(modal.visability);
  return (
    <div className="Register">
      <Modal show={modal.visability}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Modal body text goes here.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      ;<h1>Register Page</h1>
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
