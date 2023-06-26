"use client";
import Context from "./Context";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const ContextProvider = function (props) {
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("Chat #1");
  const [chatMessages, setChatMessages] = useState([
    {
      room: "Chat #1",
      text: [],
      userName: "",
      time: "",
    },
  ]);

  const setCurrentChatRoom = function (name) {
    if (currentRoom !== name) {
      socket.emit("leaveRoom");
      setCurrentRoom(name);
    }
  };
  const sendMessage = function (event, payLoad) {
    // socket.emit("chatMessage", { message, userName });
    socket.emit(event, payLoad);
  };

  useEffect(() => {
    if (socket) {
      socket.on("message", (msg) => {
        setChatMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const index = updatedMessages.findIndex(
            (item) => item.room === msg.room
          );
          if (index !== -1) {
            updatedMessages[index].text.push({
              message: msg.text,
              author: msg.userName,
              time: msg.time,
            });
            // updatedMessages[index].userName = msg.userName;
            // updatedMessages[index].time = msg.time;
          } else {
            updatedMessages.push({
              room: msg.room,
              text: [
                {
                  message: msg.text,
                  author: msg.userName,
                  time: msg.time,
                },
              ],
            });
          }
          return updatedMessages;
        });
      });
    }
  }, [socket]);

  useEffect(() => {
    const Socket = io.connect("http://localhost:3001");

    setSocket(Socket);

    return () => {
      socket?.disconnect();
    };
  }, []);

  const data = {
    socket: socket,
    room: currentRoom,
    setCurrentRoom: setCurrentChatRoom,
    sendMessage: sendMessage,
    messages: chatMessages,
  };

  return <Context.Provider value={data}>{props.children}</Context.Provider>;
};

export default ContextProvider;
