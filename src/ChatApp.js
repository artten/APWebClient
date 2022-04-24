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
  const [recipientsToDisplay, setRecipientsToDisplay] = useState("");

  // recording vars
  var [audioVar, setAudioVar] = useState("");
  // var [recorder, setRecorder] = useState("");
  //var [recording, setRecording] = useState(false);

  //var audioVar;
  var recorder;
  var recording;
  // end recording vars

  useEffect(() => {}, [audioVar]);

  useEffect(() => {}, [textsToDisplay]);

  useEffect(() => {
    getTextsToDisplay(otherUser);
  }, [otherUser]);

  useEffect(() => {
    var tempRe =
      props.users[
        props.users.findIndex(
          (user) => user.userName == props.loginUser.loginUser
        )
      ].recipientsList;
    var tempIndex = props.users.findIndex(
      (user) => user.userName == props.loginUser.loginUser
    );
    var tempUser =
      props.users[
        props.users.findIndex(
          (user) => user.userName == props.loginUser.loginUser
        )
      ];
    var tempUsers = props.users;
    tempRe.push(newContact);
    tempUser.recipientsList = tempRe;
    tempUsers[tempIndex] = tempUser;
    props.setUsers(tempUsers);
    getRecipientsToDisplay();
    setNewContact("");
  }, [props.chats]);

  useEffect(
    () => {
      getRecipientsToDisplay();
    },
    [props.chats],
    [props.users]
  );

  function ttest(i) {
    textsToDisplay[i].message.play();
  }

  // audio recording code
  const recordAudio = () =>
    new Promise(async (resolve) => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise((resolve) => {
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

  function recAudio() {
    (async () => {
      if (recording != true) {
        document.getElementById("audioB").innerHTML = "stop";
        document.getElementById("audioB").className = "btn btn-danger";
        recording = true;
        recorder = await recordAudio();
        recorder.start();
        //setNewText("Recording...")
      } else {
        document.getElementById("audioB").innerHTML = "rec";
        document.getElementById("audioB").className = "btn btn-success";
        recording = false;
        var aud = await recorder.stop();
        //audioVar = await recorder.stop();
        setAudioVar(aud);
        var temp = {
          name: props.loginUser.loginUser,
          type: "audio",
          message: aud,
        };
        var tempChats = props.chats;
        var index = props.chats.findIndex(
          (chat) =>
            (chat.recipients[0] == props.loginUser.loginUser && //props.loginUser &&
              chat.recipients[1] == otherUser) ||
            (chat.recipients[0] == otherUser &&
              chat.recipients[1] == props.loginUser.loginUser)
        );
        var tempRecipients = props.chats[index].recipients;
        var tempText = props.chats[index].texts;
        tempText.push(temp);
        tempChats[index] = { recipients: tempRecipients, texts: tempText };
        props.setChats(tempChats);
        getTextsToDisplay();
        setAudioVar("");
        //setNewText("")
        //audioVar.play();
      }
    })();
  }

  // end of audio recording code

  function pText() {
    var indents = [];
    var b;
    for (let i = 0; i < textsToDisplay.length; i++) {
      if (textsToDisplay[i].type == "text") {
        if (textsToDisplay[i].name == props.loginUser.loginUser) {
          indents.push(<p id="login_user_text">{textsToDisplay[i].message}</p>);
        } else
          indents.push(<p id="other_user_text">{textsToDisplay[i].message}</p>);
      }
      if (textsToDisplay[i].type == "audio") {
        if (textsToDisplay[i].name == props.loginUser.loginUser) {
          b = document.createElement("button");
          indents.push(
            <p id="login_user_text">
              <Button
                type="button"
                id="playA"
                onClick={() => {
                  ttest(i);
                }}
              >
                play3
              </Button>
              {"audio message"}
            </p>
          );
        } else {
          indents.push(
            <p id="other_user_text">
              <Button
                type="button"
                onClick={() => {
                  ttest(i);
                }}
              >
                play3
              </Button>
              {"audio message"}
            </p>
          );
        }
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
    };
    props.setChats([...props.chats, temp]);
    handleClose();
  }

  function isAddValid() {
    var temp = props.users;
    var i = 0;
    if (newContact == props.loginUser.loginUser) {
      var error = document.getElementById("error");
      error.textContent = "Can't add yourself";
      error.style.color = "red";
      return;
    }
    while (i < temp.length) {
      if (temp[i].userName === newContact) {
        var temp =
          props.users[
            props.users.findIndex(
              (user) => user.userName == props.loginUser.loginUser
            )
          ].recipientsList.includes(newContact);
        if (!temp) {
          addChatTolist();
          return;
        } else {
          var error = document.getElementById("error");
          error.textContent = "Already have a chat";
          error.style.color = "red";
          return;
        }
        addChatTolist();
        getRecipientsToDisplay();
        return;
      }
      i++;
    }
    var error = document.getElementById("error");
    error.textContent = "User does not exist";
    error.style.color = "red";
  }

  function addText() {
    if (newText != "") {
      var tempRecipients = [];
      var tempText = [];
      var temp = {
        name: props.loginUser.loginUser,
        type: "text",
        message: newText,
      };
      var tempChats = props.chats;
      var index = props.chats.findIndex(
        (chat) =>
          (chat.recipients[0] == props.loginUser.loginUser &&
            chat.recipients[1] == otherUser) ||
          (chat.recipients[0] == otherUser &&
            chat.recipients[1] == props.loginUser.loginUser)
      );
      if (index == -1) {
        tempRecipients.push(props.loginUser.loginUser);
        tempRecipients.push(otherUser);
        tempText.push(temp);
        tempChats.push({ recipients: tempRecipients, texts: tempText });
      } else {
        tempRecipients = props.chats[index].recipients;
        tempText = props.chats[index].texts;
        tempText.push(temp);
        tempChats[index] = { recipients: tempRecipients, texts: tempText };
      }

      props.setChats(tempChats);
      getTextsToDisplay();
      setNewText("");
    }
  }

  function getRecipientsToDisplay() {
    setRecipientsToDisplay(
      props.users[
        props.users.findIndex(
          (user) => user.userName == props.loginUser.loginUser
        )
      ].recipientsList
    );
  }

  function nicknameToUserName(nick) {
    console.log(nick);
    console.log(props.users);
    if (nick != "") {
      return props.users[props.users.findIndex((user) => user.nikename == nick)]
        .userName;
    }
  }
  function userNameToNickname(username) {
    if (username != "") {
      return props.users[
        props.users.findIndex((user) => user.userName == username)
      ].nikename;
    }
  }

  function getTextsToDisplay() {
    setTextsToDisplay(
      props.chats[
        props.chats.findIndex(
          (chat) =>
            (chat.recipients[0] == props.loginUser.loginUser && //props.loginUser &&
              chat.recipients[1] == otherUser) ||
            (chat.recipients[0] == otherUser &&
              chat.recipients[1] == props.loginUser.loginUser)
        )
      ].texts
    );
  }

  function getTextsToDisplay(otheruser) {
    if (otherUser == "") {
      setTextsToDisplay({});
      return;
    }
    var temp = props.chats.findIndex(
      (chat) =>
        (chat.recipients[0] == props.loginUser.loginUser && //props.loginUser &&
          chat.recipients[1] == otherUser) ||
        (chat.recipients[0] == otherUser &&
          chat.recipients[1] == props.loginUser.loginUser)
    );
    if (temp == -1) {
      setTextsToDisplay({});
      return;
    }
    setTextsToDisplay(
      props.chats[
        props.chats.findIndex(
          (chat) =>
            (chat.recipients[0] == props.loginUser.loginUser && //props.loginUser &&
              chat.recipients[1] == otherUser) ||
            (chat.recipients[0] == otherUser &&
              chat.recipients[1] == props.loginUser.loginUser)
        )
      ].texts
    );
  }

  function testt(i) {
    setOtherUser(recipientsToDisplay[i]);
    getTextsToDisplay(recipientsToDisplay[i]);
  }

  function printRecipients() {
    var indents = [];
    for (let i = 0; i < recipientsToDisplay.length; i++) {
      if (otherUser == recipientsToDisplay[i]) {
        indents.push(
          <div>
          <p onClick={() => testt(i)} id="current_recipients">
            {userNameToNickname(recipientsToDisplay[i])}
          </p>
          </div>
        );
      } else {
        indents.push(
          <div>
          <p onClick={() => testt(i)} id="recipients">
            {userNameToNickname(recipientsToDisplay[i])}
          </p>
          </div>
        );
      }
    }
    return indents;
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
              <button onClick={isAddValid}>Add</button>
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
          <div>{printRecipients()}</div>
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
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
              <div class="input-group-append">
                <button
                  class="btn btn-success"
                  id="audioB"
                  type="button"
                  onClick={recAudio}
                >
                  rec
                </button>
              </div>
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
