import React, { useState } from "react";
import './App.css';

function ChatApp(props) {
  console.log(props.loginUser);
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
            <button class="addchat" onClick>
            </button>
          </div>
        </div>
        <div class="rightSide"></div>
      </div>
    </body>
  );
}

export default ChatApp;
