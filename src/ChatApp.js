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
  var [addUsername, setUserName] = useState("");
  var [modal, setModal] = useState({
    text: "",
    visability: false,
  });
  //document.getElementById("errorText").innerHTML = props.loginUser.loginUser;
  console.log(props.loginUser);

  function addRecipient() {
    modal.text = setModal({
      visability: true,
      text: (
        <div>
          <label>Add new contact</label>
          <br />
          <input
            type="text"
            className="form-control-sm"
            placeholder="User Name"
            value={addUsername}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button onClick={addChatTolist}>Add</button>
        </div>
      ),
    });
  }

  function addChatTolist() {}

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
            <div className="nickname" id="nikname"></div>
            <button
              className="addchat"
              variant="primary"
              onClick={addRecipient}
            ></button>
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
