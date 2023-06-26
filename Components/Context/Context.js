import react from "react";

const Context = react.createContext({
  socket: "",
  room: "",
  setCurrentRoom: function () {},
  sendMessage: function () {},
  messages: [{}],
});

export default Context;
