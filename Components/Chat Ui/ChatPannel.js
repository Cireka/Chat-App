"use client";
import { useState, useEffect, Fragment } from "react";
import style from "./ChatPannel.module.css";
import { BsFillSendFill } from "react-icons/bs";
import { BsEmojiSmile } from "react-icons/bs";
import Context from "../Context/Context";
import { useContext } from "react";
import { useRef } from "react";
import EmojiPicker from "emoji-picker-react";

export default function ChatPannel({ socket, userName }) {
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const ctx = useContext(Context);

  const currentRoom = ctx.room;
  const chatMessages = ctx.messages;
  const dmsParrentRef = useRef();

  const ScrollToBottom = function () {
    if (dmsParrentRef.current) {
      dmsParrentRef.current.scrollTop = dmsParrentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    ScrollToBottom();
  }, [chatMessages]);

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
    console.log(message);
    if (message !== "") {
      handleMessageSubmit();
    }
  };
  const enterHandller = (event) => {
    if (event.key === "Enter" && !event.shiftKey && message !== "") {
      event.preventDefault();
      handleMessageSubmit();
    }
  };
  const typeHandller = (event) => {
    const message = event.target.value;
    setMessage(message);
  };

  const EmojiHandller = () => {
    setEmoji(!emoji);
  };

  return (
    <form className={style.Form}>
      <div className={style.ChatPannel}>
        <div ref={dmsParrentRef} className={style.dmsParrent}>
          {chatMessages &&
            chatMessages.map((message) => {
              if (message.room === currentRoom) {
                return (
                  <div key={Math.random()}>
                    {message?.text &&
                      message.text.map((item) => {
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
        </div>
        <div className={style.ChatParrent}>
          <textarea
            onKeyDown={enterHandller}
            onChange={typeHandller}
            value={message}
            className={style.chat}
          ></textarea>
        </div>
        <div className={style.IconParrent}>
          <BsFillSendFill onClick={SubmitHandller} className={style.sendIcon} />
          {emoji && (
            <div className={style.EmojiParrent}>
              <EmojiPicker
                className={style.test}
                emojiStyle="facebook"
                lazyLoadEmojis={true}
                theme="dark"
                onEmojiClick={(e) =>
                  setMessage((prevValue) => `${prevValue}${e.emoji}`)
                }
              />
              {/* <Picker
                width={"10px"}
                onEmojiSelect={(e) =>
                  setMessage((prevValue) => `${prevValue}${e.native}`)
                }
                onClickOutside={() => EmojiHandller()}
                emojiSize={20}
                size={"12em"}
                data={data}
              /> */}
            </div>
          )}
          <BsEmojiSmile onClick={EmojiHandller} className={style.EmojiIcon} />
        </div>
      </div>
    </form>
  );
}
