import style from "./section3.module.css";
import Section4 from "./section4";
import cn from "classnames";

function Section3() {
  return (
  <div className={style.container}>
      <div className={style.wrap}>
        <div className={style.video}>
          <Section4 videoLink={"./Mushroom.mp4"} bool={false} speed={300} />
        </div>
        <div className={style.text}>
          <div className={style.blurbStart}>With an</div>
          <div className={style.blurbWord}>idea,</div>
          <div className={style.blurbText}>Verb that means to set something on fire or to cause it to start burning. It is the action of initiating a combustion process, typically involving a spark, heat, or flame. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion.</div>
        </div>
      </div>
      
      <div className={style.wrap2}>
        <div className={style.text}>
          <div className={style.blurbStart}>Starting from an</div>
          <div className={style.blurbWord}>origin.</div>
          <div className={style.blurbText}>Verb that means to set something on fire or to cause it to start burning. It is the action of initiating a combustion process, typically involving a spark, heat, or flame. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion. Igniting something can also be used metaphorically to describe the act of starting or triggering a process, event, or emotion.</div>
        </div>
        <div className={style.video}>
          <Section4 videoLink={"./Succ.mp4"} bool={false} speed={500} />
        </div>
      </div>
    </div>
  );
}

export default Section3;
