import { useEffect, useState, useRef } from "react";
import style from "./section4.module.css";
import { throttle } from "lodash";

function Section4(props) {
  const {videoLink, bool, speed} = props;
  const videoRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const startPositionRef = useRef(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition(window.scrollY);
    }, 50);

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.7,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (startPositionRef.current === 0) {
            startPositionRef.current = window.scrollY;
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
      videoRef.current.play().then(() => videoRef.current.pause());
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.unobserve(videoRef.current);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const playbackRate = 0.1; // Adjust this value based on your desired speed
    // console.log(scrollPosition, startPosition, speed, videoLink, videoRef.current.currentTime)
    if (!videoRef.current) {
      return;
    }

    if (scrollPosition < startPositionRef.current || startPositionRef.current === 0) {
      videoRef.current.currentTime = 0;
      return;
    }
    videoRef.current.currentTime = (scrollPosition-startPositionRef.current)/speed;
  }, [scrollPosition]);


  return (
    <div className={style.container}>
      <video
        ref={videoRef}
        width="100%"
        muted
        playsInline
        preload="auto"
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
