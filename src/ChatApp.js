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
    <div>
      <div class="container">
        <div class="leftSide">
          <div class="head">
            <div class="userimg">
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
            <div class="nickname"></div>
            <button class="addchat" onClick></button>
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
