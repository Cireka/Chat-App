"use client";
import { Fragment } from "react";
import Header from "../Header/Header";
import ChatWrap from "../ChatWrap/ChatWrap";
import ContactsPannel from "../Chat Ui/ContactsPannel";
import ChatPannel from "../Chat Ui/ChatPannel";
import { useContext } from "react";
import Context from "../Context/Context";

export default function Chat(props) {
  const ctx = useContext(Context);

  const socket = ctx.socket;

  const userName = props.userName;

  return (
    <Fragment>
      <Header />
      <ChatWrap>
        {socket && <ContactsPannel userName={userName} socket={socket} />}
        {socket && <ChatPannel userName={userName} socket={socket} />}
      </ChatWrap>
    </Fragment>
  );
}
