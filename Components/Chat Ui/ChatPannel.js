"use client";
import { useState, useEffect, Fragment } from "react";
import style from "./ChatPannel.module.css";
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";
import Context from "../Context/Context";
import { useContext } from "react";

export default function ChatPannel({ socket, userName }) {
  const [message, setMessage] = useState("");
  const ctx = useContext(Context);

  const currentRoom = ctx.room;
  const chatMessages = ctx.messages;

  const handleMessageSubmit = () => {
    // send message
    socket.emit("chatMessage", { message, userName });

    // ande after sending it clear input
    setMessage("");
  };

  // useEffect(() => {
  //   socket.on("message", (msg) => {
  //     console.log(msg);
  //     setChatMessages((prevMessages) => [...prevMessages, msg]);
  //   });
  // }, [socket]);

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
            console.log(message);
            if (message.room === currentRoom) {
              return (
                <div key={Math.random()}>
                  {message?.text &&
                    message.text.map((item) => {
                      console.log(item);
                      return (
                        <Fragment>
                          <div className={style.MessageWrap}>
                            <p className={style.Message}>{item.message}</p>
                          </div>
                          <p className={style.TimePar}>
                            {item.author} {item.time}
                          </p>
                        </Fragment>
                      );
                    })}
                </div>
              );
            }
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
