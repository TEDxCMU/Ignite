import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import Card from './card';
import { shuffle } from 'lodash';
import styles from "../game.module.css"
import { GameOver } from 'components/gameover';

const MatchingGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  const cardWidth = 1;
  const cardHeight = 1;
  const gap = 0.5;
  const cols = 6;
  const rows = 3;

  const positions = cards.map((card, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      const x = col * (cardWidth + gap) - (cols * (cardWidth + gap)) / 2 + cardWidth / 2;
      const y = -row * (cardHeight + gap) + (rows * (cardHeight + gap)) / 2 - cardHeight / 2;
      return [x, y, 0];
  });
  
  useEffect(() => {
    const initializedCards = [
      { value: '🍕' },
      { value: '🍕' },
      { value: '🍔' },
      { value: '🍔' },
      { value: '🍟' },
      { value: '🍟' },
      { value: '🌭' },
      { value: '🌭' },
      { value: '🍿' },
      { value: '🍿' },
      { value: '🍩' },
      { value: '🍩' },
      { value: '🍪' },
      { value: '🍪' },
      { value: '🍭' },
      { value: '🍭' },
      { value: '🍦' },
      { value: '🍦' }
    ]
    setCards(shuffle(initializedCards));
  }, []);

  useEffect(() => {
    if (cards.length === 0) {
      return;
    }
    if (timeLeft === 0 || matchedCards.length === cards.length) {
        setGameOver(true);
    } else {
        const intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }
}, [timeLeft, matchedCards, cards]);


  const handleCardClick = (clickedCard) => {
    if (selectedCards.includes(clickedCard) || matchedCards.includes(clickedCard)) {
      console.log('Card already selected');
      return;
    }

    setSelectedCards([...selectedCards, clickedCard]);

    if (selectedCards.length == 1) {
      const firstCard = selectedCards[0];
      const secondCard = clickedCard;

      if (firstCard.value === secondCard.value) {
          setMatchedCards(matched => [...matched, firstCard, secondCard]);

          setTimeout(() => {
              setSelectedCards([]);
          }, 1000); // can see the second card before it disappears
      } else {
          setTimeout(() => {
              setSelectedCards([]);
          }, 1000);
      }
    }

    if (selectedCards.length > 1) {
        setSelectedCards([]);
    }

    console.log(`handleCardClick ${clickedCard.value}`)
  };

  const getScore = () => {
    return matchedCards.length * 100 + timeLeft * 10;
  }

  return (
    <div className={styles.background}>

      {gameOver && (<GameOver score={getScore()}/>)}

      <Canvas camera={{ position: [0, 0, 10] }}>
        <hemisphereLight />
        <pointLight position={[10, 10, 10]} />
        {
          cards.map((card, index) => (
            <Card
              key={index}
              position={positions[index]}
              args={[cardWidth, cardHeight, 0.1]}
              value={card.value}
              onClick={() => handleCardClick(card)}
              flipped={selectedCards.includes(card) || matchedCards.includes(card)}
            />
          ))
        }
        <Text
          position={[0, 5, 0]}
          color="white"
          fontSize={1}
          textAlign={'center'}
          anchorX="center"
          anchorY="middle"
        >
            Time Left: {timeLeft} seconds
        </Text>
      </Canvas>
    </div>
  );
};

export default MatchingGame;
