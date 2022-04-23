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

  // recording vars
  var [audioVar, setAudioVar] = useState("");
  var [recorder, setRecorder] = useState("");
  var [recording, setRecording] = useState(false);
  // end recording vars

  useEffect(
    () => {
      console.log("changed");
    },
    [textsToDisplay],
    [getTextsToDisplay]
  );

  // audio recording code
  const recordAudio = () =>
  new Promise(async resolve => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChunks.push(event.data);
    });
    const start = () => mediaRecorder.start();

    const stop = () =>
      new Promise(resolve => {
        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();
          resolve({ audioBlob, audioUrl, play });
        });

        mediaRecorder.stop();
      });

    resolve({ start, stop });
  });

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));
  function recAudio() {
    (async () => {
    if (recording == false) {
      document.getElementById("audioB").innerHTML = 'stop';
      recording = true;
        recorder = await recordAudio();
        recorder.start();
    }
    else {
      document.getElementById("audioB").innerHTML = 'rec';
      recording = false;
      audioVar = await recorder.stop();
      audioVar.play();
    }
    })();
  }

  // end of audio recording code

  function pText() {
    var indents = [];
    for (var i = 0; i < textsToDisplay.length; i++) {
      if (textsToDisplay[i].type == "text"){
        if (textsToDisplay[i].name == "artiom") {
          indents.push(<p id="login_user_text">{textsToDisplay[i].message}</p>);
        } else
          indents.push(<p id="other_user_text">{textsToDisplay[i].message}</p>);
      }
      if (textsToDisplay[i].type == "audio"){
        if (textsToDisplay[i].name == "artiom") {
          indents.push(<p id="login_user_text"><Button>play</Button>{"audio message"}</p>);
        } else
          indents.push(<p id="other_user_text"><Button>play</Button>{"audio message"}</p>);
      }
    }
    return indents;
  }

  // vars for adding chat
  var [newContact, setNewContact] = useState("");
  var [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  

  function addChatTolist() {
    var temp = {
      recipients: [props.loginUser.loginUser, newContact],
      texts: [],
    }
    props.setChats([...props.chats, temp])
    handleClose();
  }

  function isUserValid() {
    var temp = props.users;
    var i = 0;
    while (i < temp.length) {
      if (temp[i].userName === newContact) {
        addChatTolist();
        return;
      }
      i++;
    }
    var error = document.getElementById("error");
    error.textContent = "User does not exist";
    error.style.color = "red";
  }

  function addText() {
    var temp = {
      name: "artiom",
      type: "text",
      message: newText,
    };
    var tempChats = props.chats;
    var index = props.chats.findIndex(
      (chat) =>
        chat.recipients[0] == "artiom" && //props.loginUser &&
        chat.recipients[1] == "sasr"
    );
    var tempRecipients = props.chats[index].recipients;
    var tempText = props.chats[index].texts;
    tempText.push(temp);
    tempChats[index] = { recipients: tempRecipients, texts: tempText };
    props.setChats(tempChats);
    getTextsToDisplay();
    setNewText("");
  }

  function getTextsToDisplay() {
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
              <br />
              <input
                type="text"
                className="form-control-sm"
                placeholder="User Name"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
              ></input>
              <button onClick={isUserValid}>Add</button>
              <br />
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
                class="cover"
              ></img>
            </div>
            <div className="nickname" id="nikname">
              <h4>{props.loginUser.loginUser}</h4>
            </div>
            <button
              className="addchat"
              variant="primary"
              onClick={handleShow}
            ></button>
          </div>
        </div>
        <div class="rightSide">
          <div id="input_text">
            {pText()}
            <div class="input-group mb-3">
            <div class="input-group-append">
                <button class="btn btn-primary" id="audioB" type="button" onClick={recAudio}>
                  rec
                </button>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
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
