import { Button, Modal } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";

function Register(props) {
  const navigate = useNavigate();
  var [userName, setUserName] = useState("");
  var [password, setPassword] = useState("");
  var [nickname, setNickname] = useState("");
  var [image, setImage] = useState("");
  var [modal, setModal] = useState({
    text: "",
    visability: false,
  });

  useEffect(() => {}, [props.loginUser], [props.users], [modal.text], [image]);

  checkIfUserExist = checkIfUserExist.bind(this);

  function checkIfUserExist() {
    modal.visability = false;
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === userName) {
        modal.text = setModal({
          visability: true,
          text: "User name is taken please try another one",
        });
        return;
      }
      i++;
    }
    if (image != "") {
      if (userName.length > 2) {
        if (nickname.length > 2) {
          var re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{9,})");
          if (re.test(password)) {
            props.setLoginUser({ loginUser: userName });
            addUser();
            navigate("/chat");
          } else {
            modal.text = modal.text = setModal({
              visability: true,
              text: (
                <div>
                  <p>password shold be at least 9 characters and include:</p>
                  <p>1) at least one lower letter</p>
                  <p>2) at least one upper letter</p>
                  <p>3) at least one number</p>
                </div>
              ),
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
    } else {
      setModal({
        visability: true,
        text: "Not an image",
      });
    }
  }

  function addUser() {
    var temp = {
      userName: userName,
      nickname: nickname,
      password: password,
      image: image,
    };
    props.setUsers([...props.users, temp]);
  }

  function closeModal() {
    setModal({
      visability: false,
      text: "",
    });
  }

  function closeModal(e) {
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
        <div className="form-group">
          <label>Image</label>
          <br />
          <input
            type="file"
            className="form-control-sm"
            accept="image/*"
            onChange={(e) => {
              setImage(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </div>
        <br />
        <Button variant="primary" onClick={checkIfUserExist}>
          Sign Up
        </Button>
        <br></br>
        <br></br>
        <Button variant="primary" onClick={() => navigate("/")}>
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default Register;
