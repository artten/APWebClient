import { Button, Modal, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./App.css";

function ChatApp(props) {
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

  const [newText, setNewText] = useState("")

  function addText() {
   
  }

  return (
    <body>
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
          <input
            type="text"
            id="input_text"
            className="form-control"
            placeholder="Text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div id="input_text" class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={addText}>
              Send
            </button>
          </div>
        </div>
      </div>
      </div>
    </body>
  );
}

export default ChatApp;
