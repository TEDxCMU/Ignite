import React, { useRef } from 'react'
import { useSphere } from '@react-three/cannon'

const Ball = (props) => {
  const ballArgs = [1, 16, 16]
  const [ballRef, api] = useSphere(
    () => ({
      args: ballArgs,
      mass: 1,
      position: [0, 0, 0],
      onCollide: (e) => {
        if (e.collisionFilters.bodyFilterGroup === 2) {
          console.log("update score")
          props.updateScore()
        } else if (e.collisionFilters.bodyFilterGroup === 1) {
          console.log("boundary")
          props.resetGame()
        }
      }
    }),
    useRef(null),
  )

  return (
    <mesh ref={ballRef} >
      <sphereGeometry args={ballArgs} />
      <meshStandardMaterial color="white" />
    </mesh>
  )
}

export default Ball
