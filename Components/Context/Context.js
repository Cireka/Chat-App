import react from "react";

const Context = react.createContext({
  socket: "",
  room: "",
  setCurrentRoom: function () {},
});

export default Context;
