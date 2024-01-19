import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Paddle from './paddle'
import Ball from './ball'

import styles from "../game.module.css"
import { gameover } from 'components/gameover'
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

    return (
      <div className={styles.background}>
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
                <Ball updateScore={() => setScore(score + 1)} resetGame={() => gameover(score)} />
                <Boundary />
              </Debug>
            </Physics>
        </Canvas>
      </div>
    )
}

export default PongGame
