import { Fragment } from "react";
import style from "./Chat.module.css";
import Header from "../Header/Header";
import ChatWrap from "../ChatWrap/ChatWrap";
import ContactsPannel from "../Chat Ui/ContactsPannel";
import ChatPannel from "../Chat Ui/ChatPannel";
export default function Chat() {
  return (
    <Fragment>
      <Header />
      <ChatWrap>
        <ContactsPannel />
        <ChatPannel />
      </ChatWrap>
    </Fragment>
  );
}
