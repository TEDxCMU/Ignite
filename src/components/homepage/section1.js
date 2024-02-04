import style from "./section1.module.css";
import fullMushroom from "../../assets/2D/Mushroom Full Piece.png";
import Image from "next/image";

function Section1() {
  return (
    <div className={style.container}>
      <div className={style.bgImage}>
        <Image src={fullMushroom} alt="Mushroom"/>
      </div>
      <div className={style.name}>Ignite</div>
      <div className={style.tedx}>TEDxCMU 2024: Ignite</div>
      <div className={style.datetime}>February 24, 7:00 PM EST<br></br>Location: UC McConomy</div>
    </div>
  );
}

export default Section1;
