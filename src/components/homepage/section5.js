import style from "./section5.module.css";
import ignites from "../../assets/2D/It-Ignites.png";
import Image from "next/image";

function Section5() {
  return (
    <div>
      <div className={style.container1}></div>
      <div className={style.container2}>
        <div className={style.itIgnites}>
          <div>It</div>
          <Image src={ignites} alt="Ignites"/>
        </div>
      </div>
    </div>
  );
}

export default Section5;
