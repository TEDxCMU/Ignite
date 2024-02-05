import style from "./section3.module.css";
import Image from "next/image";
import mushroom1 from "../../assets/2D/Mushroom Piece1.png";
import mushroom2 from "../../assets/2D/Mushroom Piece2.png";
import mushroom3 from "../../assets/2D/Mushroom Piece3.png";
import mushroom4 from "../../assets/2D/Mushroom Piece4.png";
import mushroom5 from "../../assets/2D/Mushroom Piece5.png";
import Section4 from "./section4";

function Section3() {
  return (
  <div>
      <div className={style.wrap}>
        <div className={style.video}>
          {Section4("./Mushroom.mp4", false, 400, 500)}
        </div>
        <div className={style.text}>
          <div className={style.blurbStart}>With an</div>
          <div className={style.blurbWord}>idea</div>
          <div className={style.blurbText}>Verb that means to set something on fire or to cause it to start burning. It is the action of initiating a combustion process, typically involving a spark, heat, or flame. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion.</div>
        </div>
      </div>
      
      <div className={style.wrap}>
        <div className={style.text}>
          <div className={style.blurbStart}>Starting from an</div>
          <div className={style.blurbWord}>origin</div>
          <div className={style.blurbText}>Verb that means to set something on fire or to cause it to start burning. It is the action of initiating a combustion process, typically involving a spark, heat, or flame. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion.</div>
        </div>
        <div className={style.video}>
          {Section4("./Succ.mp4", false, 2000, 200)}
        </div>
      </div>
    </div>
  );
}

export default Section3;
