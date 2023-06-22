"use client";
import { useState, useEffect } from "react";
import style from "./ChatPannel.module.css";
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";

export default function ChatPannel({ socket }) {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleMessageSubmit = () => {
    // send message
    socket.emit("chatMessage", message);
    // ande after sending it clear input
    setMessage("");
  };

  socket.on("message", (msg) => {
    console.log(msg);
    setChatMessages([...chatMessages, msg]);
  });

  const SubmitHandller = (event) => {
    event.preventDefault();
    if (message !== "") {
      handleMessageSubmit();
    }
  };
  const enterHandller = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleMessageSubmit();
    }
  };
  const typeHandller = (event) => {
    const message = event.target.value;
    setMessage(message);
  };
  return (
    <form>
      <div className={style.ChatPannel}>
        {chatMessages &&
          chatMessages.map((message) => {
            return (
              <div key={Math.random()}>
                <div className={style.MessageWrap}>
                  <p className={style.Message}>{message.text}</p>
                </div>
                <p className={style.TimePar}>
                  {message.userName} {message.time}
                </p>
              </div>
            );
          })}
        <textarea
          onKeyDown={enterHandller}
          onChange={typeHandller}
          value={message}
          className={style.chat}
        ></textarea>
        <div className={style.IconParrent}>
          <BsFillSendFill onClick={SubmitHandller} className={style.sendIcon} />
          <MdAttachFile className={style.AttachIcon} />
        </div>
      </div>
    </form>
  );
}
