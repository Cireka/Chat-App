"use client";
import style from "./ContactsPannel.module.css";
import { BsPlusSquare } from "react-icons/bs";
import Contact from "../Rooms Ui/Contact";
import { Fragment, useState, useEffect } from "react";
import Context from "../Context/Context";
import { useContext } from "react";

export default function ContactsPannel(props) {
  const socket = props.socket;
  const userName = props.userName;
  const ctx = useContext(Context);
  const currentRoom = ctx.room;

  const [error, setError] = useState(false);
  const [chats, setChats] = useState([
    {
      chatName: "Chat #1",
      highlighted: true,
    },
  ]);
  const [joinPannel, setJoinPannel] = useState(false);
  const [joinRoom, setJoinRoom] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", { userName, room: currentRoom });
  }, [currentRoom]);

  const selectChatHandller = (name) => {
    ctx.setCurrentRoom(name);
    setChats((prevChats) =>
      prevChats.map((item) => ({
        ...item,
        highlighted: item.chatName === name, // Update the highlighted property
      }))
    );
  };
  const addContactHandller = () => {
    setError(false);
    setJoinPannel(!joinPannel);
  };
  const joinRoomValueHandller = (event) => {
    const value = event.target.value;
    setJoinRoom(value);
  };
  const joinRoomHandller = (event) => {
    event.preventDefault();
    const roomName = joinRoom;
    const isDuplicateName = chats.find((chat) => chat.chatName === roomName);
    if (isDuplicateName) {
      setError("Duplicate Name.");
    } else {
      setError(false);
      setChats([...chats, { chatName: roomName, highlighted: false }]);
      setJoinPannel(!joinPannel);
    }
  };

  return (
    <div className={style.ContactsPannelParrent}>
      <div className={style.ContactsPannelContainer}>
        {joinPannel && (
          <Fragment>
            <div onClick={addContactHandller} className={style.Wrap}></div>
            <div className={style.ChatCreatePannelParrent}>
              <form className={style.form}>
                <label>Enter Room Name</label>
                <input onChange={joinRoomValueHandller} type="text" />
                {error && <p className={style.errorMessage}>{error}</p>}
                <button className={style.Button} onClick={joinRoomHandller}>
                  Create/Join Room
                </button>
              </form>
            </div>
          </Fragment>
        )}
        <div className={style.ContactsHeaderParrent}>
          <h1>Messages</h1>
          <BsPlusSquare onClick={addContactHandller} className={style.icon} />
        </div>
        {chats.map((chat) => {
          return (
            <Contact
              onClick={() => selectChatHandller(chat.chatName)}
              key={Math.random()}
              chatName={`${chat.chatName}`}
              highLighted={chat.highlighted}
            />
          );
        })}
      </div>
    </div>
  );
}
