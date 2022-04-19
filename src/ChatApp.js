import React, { useState } from "react";
import "./App.css";
import logo from "./logo.png";

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
          </div>
        </div>
        <div class="rightSide"></div>
      </div>
    </body>
  );
}

export default ChatApp;
