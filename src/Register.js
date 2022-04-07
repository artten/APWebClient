import { Button, Modal } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

function Register(props) {
  const navigate = useNavigate();
  var [userName, setUserName] = useState("");
  var [password, setPassword] = useState("");
  var [nickname, setNickname] = useState("");
  var [modal, setModal] = useState({
    text: "aaa",
    visability: false,
  });

  useEffect(() => {}, [props.loginUser], [props.users], [modal.text]);

  checkIfUserExist = checkIfUserExist.bind(this);

  function checkIfUserExist() {
    modal.visability = false;
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === userName) {
        return;
      }
      i++;
    }

    if (userName.length > 2) {
      if (nickname.length > 2) {
        var re = new RegExp("^([a-z0-9A-Z]{5,})$");
        if (re.test(password)) {
          props.setLoginUser({ loginUser: userName });
          addUser();
          navigate("/chat");
        } else {
          modal.text = modal.text = setModal({
            visability: true,
            text:
              "password shold be at least 9 characters and include:" +
              "1) at least one lower letter\n2) at least one upper letter\n3) at least one number",
          });
        }
      } else {
        modal.text = setModal({
          visability: true,
          text: "Nikname should be at least 3 letters",
        });
      }
    } else {
      setModal({
        visability: true,
        text: "Username should be at least 3 letters",
      });
    }
  }

  function addUser() {
    var temp = { userName: userName, nickname: nickname, password: password };
    props.setUsers([...props.users, temp]);
  }

  function closeModal() {
    setModal({
      visability: false,
      text: "",
    });
  }

  return (
    <div className="Register">
      <Modal show={modal.visability}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Somthing went wrong</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{modal.text}</p>
          </Modal.Body>

          <Modal.Footer>
            <Button class="btn btn-primary" onClick={closeModal}>
              Close
            </Button>
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
