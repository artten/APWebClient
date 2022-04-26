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
  var [image, setImage] = useState("");

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
    var timenow = getTime();
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
          time: timenow
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
      if (textsToDisplay[i].type == "video") {
        if (textsToDisplay[i].name == props.loginUser.loginUser) {
          indents.push(<div id="login_video_chat"><div>
          <video width="320" height="240" controls
             src={textsToDisplay[i].message} type="video/mp4">
              Your browser does not support the video tag.
          </video>
          </div><br/></div>);
          
        } else
          indents.push(<div id="other_video_chat"><div>
          <video width="320" height="240" controls
             src={textsToDisplay[i].message} type="video/mp4">
              Your browser does not support the video tag.
          </video>
          </div><br/></div>);
      }
      if (textsToDisplay[i].type == "image") {
        console.log(textsToDisplay[i].message);
        if (textsToDisplay[i].name == props.loginUser.loginUser) {
          indents.push(<div id="login_img_chat"><div>
          <img id="chat_img"
          src={textsToDisplay[i].message}
          class="cover"
        ></img>
          </div><br/></div>);
          
        } else
          indents.push(<div id="other_img_chat"><div>
          <img id="chat_img"
          src={textsToDisplay[i].message}
          class="cover"
        ></img>
          </div><br/></div>);
      }
      if (textsToDisplay[i].type == "audio") {
        console.log(textsToDisplay[i].message);
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
                play
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
                play
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

  function getTime() {
    var currentdate = new Date(); 
    if (currentdate.getMinutes() < 10) {
      return currentdate.getHours() + ":0" + currentdate.getMinutes();
    }
    return currentdate.getHours() + ":" + currentdate.getMinutes();
  }

  function addText() {
    var timenow = getTime();
    if (newText != "") {
      var tempRecipients = [];
      var tempText = [];
      var temp = {
        name: props.loginUser.loginUser,
        type: "text",
        message: newText,
        time: timenow
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
      printRecipients();
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
    var rightSide1 = document.getElementById("div1");
    rightSide1.style.display = "none";
    var rightSide2 = document.getElementById("div2");
    rightSide2.style.display = "flex";
    setOtherUser(recipientsToDisplay[i]);
    getTextsToDisplay(recipientsToDisplay[i]);
  }

  function printLastMsg(otherUser){
    var temp = props.chats[
      props.chats.findIndex(
        (chat) =>
          (chat.recipients[0] == props.loginUser.loginUser && //props.loginUser &&
            chat.recipients[1] == otherUser) ||
          (chat.recipients[0] == otherUser &&
            chat.recipients[1] == props.loginUser.loginUser)
      )
    ].texts;
    if (temp[temp.length - 1].type == "text"){
      return temp[temp.length - 1].message;
    }
    else{
      return temp[temp.length - 1].type;
    }
  }

  function printLastMsgTime(otherUser){
    var temp = props.chats[
      props.chats.findIndex(
        (chat) =>
          (chat.recipients[0] == props.loginUser.loginUser && //props.loginUser &&
            chat.recipients[1] == otherUser) ||
          (chat.recipients[0] == otherUser &&
            chat.recipients[1] == props.loginUser.loginUser)
      )
    ].texts;
    return temp[temp.length - 1].time;
  }

  function printRecipients() {
    var indents = [];
    //console.log(recipientsToDisplay);
    for (let i = 0; i < recipientsToDisplay.length; i++) {
      if (recipientsToDisplay[i] != ""){
      if (otherUser == recipientsToDisplay[i]) {
        indents.push(
          <div className="leftRecipients_chosen">
            <div className="userimg">
            <img
            src={
              props.users[
                props.users.findIndex(
                  (user) => user.userName == recipientsToDisplay[i]
                )
              ].image
            }
            class="cover"
          ></img>
            </div>
            <div className="nickname" id="nikname">
              <h5 onClick={() => testt(i)}>{userNameToNickname(recipientsToDisplay[i])}</h5>
              <h6>{printLastMsg(otherUser)}</h6>
            </div>
            <div className="lastMessage" id="lmsg">
              <h6>{printLastMsgTime(otherUser)}</h6>
            </div>
          </div>
        );
      } else {
        //console.log(recipientsToDisplay[i]);
        indents.push(
          <div className="leftRecipients">
            <div className="userimg">
            <img
            src={
              props.users[
                props.users.findIndex(
                  (user) => user.userName == recipientsToDisplay[i]
                )
              ].image
            }
            class="cover"
          ></img>
            </div>
            <div className="nickname" id="nikname">
              <h5 onClick={() => testt(i)} id="recipients">{userNameToNickname(recipientsToDisplay[i])}</h5>
              <h6>{printLastMsg(recipientsToDisplay[i])}</h6>
            </div>
            <div className="lastMessage" id="lmsg">
              <h6>{printLastMsgTime(recipientsToDisplay[i])}</h6>
            </div>
          </div>
        );
      }
    }
    }
    return indents;
  }

  function addImage(image) {
    var timenow = getTime();
    var temp = {
      name: props.loginUser.loginUser,
      type: "image",
      message: image,
      time: timenow
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
    setImage(image);
    document.getElementById("img_input").value = "";
  }

  function addVideo(video) {
    var timenow = getTime();
    var temp = {
      name: props.loginUser.loginUser,
      type: "video",
      message: video,
      time: timenow
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
    setImage(video);
    document.getElementById("video_input").value = "";
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
        <div class="rightSide1" id="div1">
        </div>
        <div class="rightSide2" id="div2">
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
              
                <label class="btn btn-secondary">
                  <i class="fa fa-image"></i>
                    image
                  <input id="img_input" type="file" style={{display: "none"}} 
                    onChange={(e) => {
                      addImage(URL.createObjectURL(e.target.files[0]));
                      }} name="image"/>
                </label>
              </div>
              <div class="input-group-append">
              
                <label class="btn btn-secondary">
                  <i class="fa fa-image"></i>
                    video
                  <input id="video_input" type="file" style={{display: "none"}} 
                    
                    onChange={(e) => {
                      addVideo(URL.createObjectURL(e.target.files[0]));
                      }} name="video"/>
                </label>
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
