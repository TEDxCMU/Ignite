import style from "./section1.module.css";
import fullMushroom from "../../assets/2D/Mushroom Full Piece.png";
import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import { animate } from "motion";

function Section1() {
  const videoRef = useRef(null);

  // init opacities
  useEffect(() => {
    animate(
      `.${style.name}`, 
      { opacity: [0, 0] },
      { duration: 10.0 }
    );

    animate(
      `.${style.tedx}`, 
      { opacity: [0, 0] },
      { duration: 10.0 }
    );

    animate(
      `.${style.datetime}`, 
      { opacity: [0, 0] },
      { duration: 10.0 }
    );
  });

  useEffect(() => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      }
    }
  }, [videoRef]);

  const onVideoEnded = () => {
    if (videoRef.current) {
      console.log(videoRef.current, "ended");

      animate(
        `.${style.name}`, 
        { opacity: [0, 1] },
        { duration: 1.0 }
      );

      animate(
        `.${style.tedx}`, 
        { opacity: [0, 1] },
        { delay: 1.0, duration: 1.0 }
      );

      animate(
        `.${style.datetime}`, 
        { opacity: [0, 1] },
        { delay: 1.0, duration: 1.0 }
      );
    }
  };

  return (
    <div className={style.container}>
      <div className={style.bgImage}>
        <video
          ref={videoRef}
          width="100%"
          muted
          playsInline
          onEnded={onVideoEnded}
        >
          <source src="./mushroom_animated.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className={style.name}>Ignite</div>
      <div className={style.tedx}>TEDxCMU 2024: Ignite</div>
      <div className={style.datetime}>February 24, 7:00 PM EST<br></br>Location: UC McConomy</div>
    </div>
  );
}

export default Section1;
