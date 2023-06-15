import style from "./ChatWrap.module.css";
export default function ChatWrap(props) {
  return <div className={style.ChatWrap}>{props.children}</div>;
}
