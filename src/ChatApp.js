import { Button, Modal, Form } from "react-bootstrap";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./App.css";

function ChatApp(props) {
  var [addUsername, setUserName] = useState("");
  var [modal, setModal] = useState({
    text: "",
    visability: false,
  });
  //document.getElementById("errorText").innerHTML = props.loginUser.loginUser;
  console.log(props.loginUser);

  function addRecipient(){
    modal.text = setModal({
      visability: true,
      text: (<div>
        <label>Add new contact</label>
        <br/>
        <input
        type="text"
        className="form-control-sm"
        placeholder="User Name"
        value={addUsername}
        onChange={(e) => setUserName(e.target.value)}
      />
        <button onClick={addChatTolist}>Add</button>
      </div>),
    });
  }

  function addChatTolist(){

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
  
  const [newText, setNewText] = useState("")

  function addText() {
          props.chats[
            props.users.findIndex(
              (user) => user.userName == props.loginUser.loginUser
            )
          ]
  }

  return (
    <body>
    <div className="chatApp">
    <Modal show={modal.visability}>
    <Modal.Dialog>
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
            class="cover"
          ></img>
            </div>
            <div className="nickname" id="nikname">
            </div>
            <button className="addchat" variant="primary" onClick={addRecipient}>
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
