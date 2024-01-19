import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Paddle from './paddle'
import Ball from './ball'

import styles from "../game.module.css"
import { GameOver } from 'components/gameover'
import { Debug, Physics, usePlane } from '@react-three/cannon'

function Boundary() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -6, 0],
    collisionFilterGroup: 1,
   }))
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  )
}

const PongGame = () => {
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(false)

    const updateScore = () => {
      setScore(prevScore => prevScore + 1)
    }

    const resetGame = () => {
      setGameOver(true)
    }

    return (
      <div className={styles.background}>

        {gameOver && <GameOver score={score} />}

        <Canvas camera={{ position: [0, 0, 10] }}>
            <Physics
              defaultContactMaterial={{
                restitution: 1,
              }}
            >
              <Debug>
                <hemisphereLight />
                <pointLight position={[10, 10, 10]} />
                <Paddle />
                <Ball updateScore={updateScore} resetGame={resetGame} />
                <Boundary />
              </Debug>
            </Physics>
        </Canvas>
      </div>
    )
}

export default PongGame
