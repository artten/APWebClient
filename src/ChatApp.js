import React, { useState } from "react";
import "./App.css";

function ChatApp(props) {
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
    </body>
  );
}

export default ChatApp;
