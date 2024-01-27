import { useEffect, useRef } from "react";
import style from "./section2.module.css";
import { animate } from "motion";

function Section2() {

  const blurbRef = useRef(null)

  useEffect(() => {
    if (!blurbRef.current) return;

    animate(
      `.blurb`,
      { x: [-blurbRef.current.offsetWidth-50, 0] },
      {
        duration: 3,
        repeat: Infinity,
        easing: 'linear'
      }
    );
  }, [blurbRef]);

  return (
    <div className={style.container}>
      <div className={`blurb ${style.blurb}`} ref={blurbRef}>Where does it all <span className={style.begin}>begin?</span></div>
      <div className={`blurb ${style.blurb}`}>Where does it all <span className={style.begin}>begin?</span></div>
      <div className={`blurb ${style.blurb}`}>Where does it all <span className={style.begin}>begin?</span></div>
      <div className={`blurb ${style.blurb}`}>Where does it all <span className={style.begin}>begin?</span></div>
    </div>
  );
}

export default Section2;
