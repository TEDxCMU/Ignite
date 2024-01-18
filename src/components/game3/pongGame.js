import React from 'react'
import { Canvas } from '@react-three/fiber'
import Paddle from './paddle'
import Ball from './ball'

import styles from "../game.module.css"
import { Debug, Physics } from '@react-three/cannon'

const PongGame = () => {
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
                <Ball />
              </Debug>
            </Physics>
        </Canvas>
      </div>
    )
}

export default PongGame
