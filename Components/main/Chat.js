"use client";
import { Fragment, useState, useEffect } from "react";
import style from "./Chat.module.css";
import Header from "../Header/Header";
import ChatWrap from "../ChatWrap/ChatWrap";
import ContactsPannel from "../Chat Ui/ContactsPannel";
import ChatPannel from "../Chat Ui/ChatPannel";
import { io } from "socket.io-client";

export default function Chat() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = io.connect("http://localhost:3001");

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  // All of the code below happends when user connects!
  // because that how we configured it in the backend.
  // socket.on("message", (message) => {
  //   // console.log(message);
  // });

  return (
    <Fragment>
      <Header />
      <ChatWrap>
        <ContactsPannel />
        {socket && <ChatPannel socket={socket} />}
      </ChatWrap>
    </Fragment>
  );
}
