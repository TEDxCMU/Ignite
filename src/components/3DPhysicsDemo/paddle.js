import { useBox } from '@react-three/cannon'
import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { lerp } from 'three/src/math/MathUtils'

const Paddle = () => {
  const paddleArgs = [5, 1, 1]

  const [paddleRef, api] = useBox(
    () => ({
      args: paddleArgs,
      type: 'Static',
      position: [0, -5, 0],
      collisionFilterGroup: 2,
    }),
    useRef(null),
  )
  
  const paddlePos = useRef(0)
  useFrame((state) => {
      paddlePos.current = lerp(paddlePos.current, (state.pointer.x * Math.PI) / 5, 0.2)
      api.position.set(state.pointer.x * 10, -5, 0)
    })

  return (
      <mesh ref={paddleRef} >
          <boxGeometry args={paddleArgs} />
          <meshStandardMaterial color="white" />
      </mesh>
  )
}

export default Paddle
