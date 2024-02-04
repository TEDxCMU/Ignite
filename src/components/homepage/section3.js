import style from "./section3.module.css";
import Image from "next/image";
import mushroom1 from "../../assets/2D/Mushroom Piece1.png";
import mushroom2 from "../../assets/2D/Mushroom Piece2.png";
import mushroom3 from "../../assets/2D/Mushroom Piece3.png";
import mushroom4 from "../../assets/2D/Mushroom Piece4.png";
import mushroom5 from "../../assets/2D/Mushroom Piece5.png";

function Section3() {
  return (
    <div className={style.container}>
      <div className={`${style.bgImage} ${style.bgImage1}`}>
        <Image src={mushroom1} alt="Mushroom"/>
      </div>
      <div className={`${style.bgImage} ${style.bgImage2}`}>
        <Image src={mushroom2} alt="Mushroom"/>
      </div>
      <div className={`${style.blurbcontainer} ${style.blurb1}`}>
        <div className={style.blurbStart}>With an</div>
        <div className={style.blurbWord}>idea</div>
        <div className={style.blurbText}>Verb that means to set something on fire or to cause it to start burning. It is the action of initiating a combustion process, typically involving a spark, heat, or flame. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion.</div>
      </div>
      <div className={`${style.blurbcontainer} ${style.blurb2}`}>
        <div className={style.blurbStart}>Starting from an</div>
        <div className={style.blurbWord}>origin</div>
        <div className={style.blurbText}>Verb that means to set something on fire or to cause it to start burning. It is the action of initiating a combustion process, typically involving a spark, heat, or flame. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion.</div>
      </div>
    </div>
  );
}

export default Section3;
