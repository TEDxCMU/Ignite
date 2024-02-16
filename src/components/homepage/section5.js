import style from "./section5.module.css";
import ignites from "../../assets/2D/It-Ignites.png";
import mushroom1 from "../../assets/2D/Mushroom-Piece1.png";
import mushroom2 from "../../assets/2D/Mushroom-Piece2.png";
import mushroom3 from "../../assets/2D/Mushroom-Piece3.png";
import Image from "next/image";
import { useEffect } from "react";
import { animate, scroll, inView } from "motion";
import Section4 from "./section4";

function Section5() {

  useEffect(() => {
    const element = document.querySelectorAll(`.${style.container}`)[0]

    const scrollOptions = {
      target: element,
      offset: ["start start", "end end"]
    }

    scroll(animate(
      element, 
      { backgroundColor: ["#000000", "#FF3216"] }
    ), scrollOptions);

    // inView(`.${style.itIgnites} img`, ({ target }) => {
    //   animate(
    //   `.${style.m1}`, 
    //   { opacity: [0, 1]}, //, rotateZ: [-90, 0], x: [0, -100], y: [0, 50] },
    //   { duration: 1.0 }
    // )});

    // inView(`.${style.itIgnites} img`, ({ target }) => {
    //   animate(
    //   `.${style.m2}`, 
    //   { opacity: [0, 1]}, //, rotateZ: [-90, 0], x: [0, -100], y: [0, 100]},
    //   { duration: 1.0, 
    //     delay: 0.2 }
    // )});

    // inView(`.${style.itIgnites} img`, ({ target }) => {
    //   animate(
    //   `.${style.m3}`, 
    //   { opacity: [0, 1]}, //, rotateZ: [-90, 0], x: [0, -250], y: [0, 200]},
    //   { duration: 1.0,
    //     delay: 0.4}
    // )});

  }, []);

  return (
    <div>
      <div className={style.container}>
        <Image className={style.m1} src={mushroom1} alt="Mushroom1"/>
        <Image className={style.m2} src={mushroom2} alt="Mushroom2"/>
        <Image className={style.m3} src={mushroom3} alt="Mushroom3"/>
        <div className={style.itIgnites}>
          <div>It</div>
          <Image src={ignites} alt="Ignites"/>
        </div>
      </div>
    </div>
  );
}

export default Section5;
