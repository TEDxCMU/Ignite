import { useEffect, useRef } from "react";
import style from "./section4.module.css";

function Section4() {
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Play the video when the video element comes into view
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      },
      {
        threshold: 0.5, // 50% of the video must be visible to trigger play
        rootMargin: '0px', // Margin around the root
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoRef]);

  return (
    <div className={style.container}>
      <video
        ref={videoRef}
        width="100%"
        muted
        loop
        playsInline
        preload="none"
        className={style.video}
      >
        <source src="./placeholder-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={style.text}>It expands,<br></br>fluctuates,<br></br>grows,<br></br>transforms.</div>
    </div>
  );
}

export default Section4;
