import style from "./Header.module.css";
import { AiFillBell } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
export default function Header() {
  return (
    <section className={style.NavigationSection}>
      <nav className={style.NaviagtionParrent}>
        <div className={style.IconParrents}>
          <AiFillBell className={style.Icon} />
          <BsFillPersonFill className={style.Icon} />
        </div>
      </nav>
    </section>
  );
}
