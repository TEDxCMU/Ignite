import Image from 'next/image';
import mushroomfull from '../assets/2D/Mushroom Full Piece.png';
import mushroom1 from '../assets/2D/Mushroom Piece1.png';
import mushroom2 from '../assets/2D/Mushroom Piece2.png';
import mushroom3 from '../assets/2D/Mushroom Piece3.png';
import mushroom4 from '../assets/2D/Mushroom Piece4.png';
import mushroom5 from '../assets/2D/Mushroom Piece5.png';
import React, { useEffect, useRef, useState } from 'react';
import styles from './background.module.css';
import { useRouter } from 'next/router';


function Background(props) {
  const mushroomPieces = [mushroom1, mushroom2, mushroom3, mushroom4, mushroom5]
  const [mushrooms, setMushrooms] = useState([]);
  const [mushroomProperties, setMushroomProperties] = useState([]);
  const bgRef = useRef(null);
  const router = useRouter();

  const generateMushroomPieces = (count) => {
    const pieces = [];
    for (let i = 0; i < count; i++) {
      const piece = mushroomPieces[Math.floor(Math.random() * mushroomPieces.length)];
      pieces.push(piece);
    }
    return pieces;
  }

  useEffect(() => {
    const mushrooms = generateMushroomPieces(props.count || 5);
    setMushrooms(mushrooms);
  }, []);

  useEffect(() => {
    const newMushroomProperties = mushrooms.map((mushroom) => {
      const x = Math.random() * window.innerWidth - 100;
      const y = document.documentElement.scrollHeight * Math.random() - 100;
      const rotation = Math.random() * 360; // Random rotation between 0 and 360 degrees
      const scale = Math.random() * 1.0 + 1.5; // Random scale between 0.5 and 1
  
      return { x, y, rotation, scale };
    });
    
    setMushroomProperties(newMushroomProperties);

    if (bgRef.current) {
      const bgHeight = document.documentElement.offsetHeight;
      bgRef.current.style.height = `${bgHeight}px`;
    }
    
  }, [mushrooms]);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const mushrooms = generateMushroomPieces(props.count || 5);
      setMushrooms(mushrooms);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  

  return (
    <div ref={bgRef} className={styles.background}>
      {mushroomProperties.map((properties, index) => (
        <Image
          key={index}
          src={mushrooms[index].src}
          width={0}
          height={0}
          alt="Mushroom Piece"
          sizes={"100vw"}
          style={{
            width: '300px',
            height: 'auto',
            position: 'absolute',
            zIndex: -1,
            transform: `translate(${properties.x}px, ${properties.y}px) rotate(${properties.rotation}deg) scale(${properties.scale})`,
          }}
        />
      ))}
    </div>
  );
}

export default Background;
