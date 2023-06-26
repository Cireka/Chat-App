"use client";
import Context from "./Context";
import { io } from "socket.io-client";
import { useState, useEffect } from "react";

const ContextProvider = function (props) {
  const [socket, setSocket] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("Chat #1");

  const setCurrentChatRoom = function (name) {
    if (currentRoom !== name) {
      socket.emit("leaveRoom");
      setCurrentRoom(name);
    }
  };
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
  };

  return <Context.Provider value={data}>{props.children}</Context.Provider>;
};

export default ContextProvider;
