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
          <div className={style.blurbText}>The TEDx Board is incredibly excited to introduce the theme for our 2024 conference - Ignite.<br></br><br></br>Every idea has the power to not only challenge the established but to illuminate new pathways of thought. By sharing these stories, you become the key to unlocking a cascade of ideas in others. </div>
        </div>
      </div>
      
      <div className={style.wrap2}>
        <div className={style.text}>
          <div className={style.blurbStart}>Starting from an</div>
          <div className={style.blurbWord}>origin.</div>
          <div className={style.blurbText}>TEDxIgnite is more than a conference; it's a place where answers for the uncharted future are forged in the present. We invite you to delve into the unknown with us, igniting a spark that will shape those around us. Tomorrow is up to those who prepare for it today. Are you ready to light up the world?</div>
        </div>
        <div className={style.video}>
          <Section4 videoLink={"./Succ.mp4"} bool={false} speed={500} />
        </div>
      </div>
    </div>
  );
}

export default Section3;
