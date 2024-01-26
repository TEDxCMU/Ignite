import style from "./section1.module.css";

function Section1() {
  return (
    <div className={style.container}>
      <div className={style.name}>Ignite</div>
      <div className={style.tedx}>TEDxCMU 2024: Ignite</div>
      <div className={style.datetime}>February</div>
    </div>
  );
}

export default Section1;
