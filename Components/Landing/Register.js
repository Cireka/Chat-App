"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import style from "./formParrent.module.css";
export default function Register() {
  const route = useRouter();
  const [name, setName] = useState("");

  const NavigateHandller = (event) => {
    event.preventDefault();
    route.push(`/chat/${name}`);
  };
  const inputHandller = (event) => {
    const userName = event.target.value;
    setName(userName);
  };
  return (
    <div className={style.formParrent}>
      <div className={style.Wrap}>
        <form className={style.Form}>
          <label>Please enter your username</label>
          <input onChange={inputHandller} type="text" />
          <button onClick={NavigateHandller}>Enter Chat</button>
        </form>
      </div>
    </div>
  );
}
