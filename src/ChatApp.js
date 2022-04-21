import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Modal, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";

function ChatApp(props) {
  const [newText, setNewText] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [textsToDisplay, setTextsToDisplay] = useState("");
  function pText() {
    var indents = [];
    for (var i = 0; i < textsToDisplay.length; i++) {
      if (textsToDisplay[i].name == "artiom") {
        indents.push(<p id="login_user_text">{textsToDisplay[i].message}</p>);
      } else
        indents.push(<p id="other_user_text">{textsToDisplay[i].message}</p>);
    }
    return indents;
  }
  var [newContact, setNewContace] = useState("");
  var [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //document.getElementById("errorText").innerHTML = props.loginUser.loginUser;
  console.log(props.loginUser);

  function addChatTolist(){
    handleClose();
  }
  function isUserValid(){
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === newContact){
        addChatTolist();
        return;
      }
      i++;
    }
    var error = document.getElementById("error")
    error.textContent = "User does not exist"
    error.style.color = "red"
  }

  function addText() {
    setTextsToDisplay(
      props.chats[
        props.chats.findIndex(
          (chat) =>
            chat.recipients[0] == "artiom" && //props.loginUser &&
            chat.recipients[1] == "sasr"
        )
      ].texts
    );
  }

  return (
    <div className="chatApp">
    <Modal show={show} onHide={handleClose}>
    <Modal.Dialog>
      <Modal.Body>
      <div class="form-group">
        <label>Add new contact</label>
        <br/>
        <input
          type="text"
          className="form-control-sm"
          placeholder="User Name"
          value={newContact}
          onChange={(e) => setNewContace(e.target.value)}>
        </input>
        <button onClick={isUserValid}>Add</button>
        <br/>
        <div id="error"></div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button class="btn btn-primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
    </Modal>
      <div className="container">
        <div className="leftSide">
          <div className="head">
            <div className="userimg">
            <img
            src={
              props.users[
                props.users.findIndex(
                  (user) => user.userName == props.loginUser.loginUser
                )
              ].image
            }
            class="cover"></img>
            </div>
            <div className="nickname" id="nikname">
            <h4>{props.loginUser.loginUser}</h4>
            </div>
            <button className="addchat" variant="primary" onClick={handleShow}>
            </button>
          </div>
        </div>
        <div class="rightSide">
          <div id="input_text">
            {pText()}
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn btn-primary" type="button" onClick={addText}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;
