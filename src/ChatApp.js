import React, { useState } from "react";
import './App.css';
import logo from './images/logo.png';

function ChatApp(props) {
  console.log(props.loginUser);
  return (
    <body>
      <div class="container">
        <div class="leftSide">
          <div class="head">
            <div class="userimg"> 
              <img src={logo} class="cover"></img>
            </div>
            <div class="nickname"></div>
            <button class="addchat" onClick>
            </button>
          </div>
        </div>
        <div class="rightSide">
        </div>
      </div>
    </body>
    
    
  );
}

export default ChatApp;
