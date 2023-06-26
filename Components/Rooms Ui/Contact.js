import style from "./Contact.module.css";
import { CgProfile } from "react-icons/cg";
export default function Contact(props) {
  return (
    <div onClick={props.onClick} className={style.ChatRoomsParrent}>
      <div className={style.ChatRoom}>
        <CgProfile className={style.profileIcon} />
        <h1>{props.chatName}</h1>
      </div>
    </div>
  );
}
