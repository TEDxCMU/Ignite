import { useEffect, useState, useRef } from "react";
import style from "./section4.module.css";

function Section4(videoLink, bool) {
  const videoRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // setThresholdPosition(window.scrollY);
          videoRef.current.play();
        } else {
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    observer.observe(videoRef.current);

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const playbackRate = 0.1; // Adjust this value based on your desired speed
    console.log(scrollPosition, videoLink, videoRef.current.currentTime)
    videoRef.current.currentTime = (scrollPosition)/1000;
  }, [scrollPosition]);


  return (
    <div className={style.container}>
      <video
        ref={videoRef}
        width="100%"
        muted
        playsInline
        preload="none"
        className={style.video}
      >
        <source src={videoLink} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {bool? (
        <div className={style.text}>It expands,<br></br>fluctuates,<br></br>grows,<br></br>transforms.</div>
      ):(
        <></>
      )
      }
    </div>
  );
}

export default Section4;
