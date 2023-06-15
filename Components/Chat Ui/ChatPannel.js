import style from "./ChatPannel.module.css";
import { BsFillSendFill } from "react-icons/bs";
import { MdAttachFile } from "react-icons/md";

export default function ChatPannel() {
  return (
    <div className={style.ChatPannel}>
      <textarea className={style.chat}></textarea>
      <div className={style.IconParrent}>
        <div className={style.sendIconParrent}>
          <BsFillSendFill className={style.sendIcon} />
        </div>
        <MdAttachFile className={style.AttachIcon} />
      </div>
    </div>
  );
}
