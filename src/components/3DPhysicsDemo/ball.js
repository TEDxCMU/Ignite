import React, { useRef } from 'react'
import { useSphere } from '@react-three/cannon'

const PADDLEGROUP = 2
const BOUNDARYGROUP = 1

const Ball = (props) => {
  const ballArgs = [1, 16, 16]
  const [ballRef, api] = useSphere(
    () => ({
      args: ballArgs,
      mass: 1,
      position: [0, 0, 0],
      onCollide: (e) => {
        if (e.collisionFilters.bodyFilterGroup === PADDLEGROUP) {
          props.updateScore()
        } else if (e.collisionFilters.bodyFilterGroup === BOUNDARYGROUP) {
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
