import React, { useRef } from 'react'
import { useSphere } from '@react-three/cannon'

const Ball = () => {
  const ballArgs = [1, 16, 16]
  const [ballRef, api] = useSphere(
    () => ({
      args: ballArgs,
      mass: 1,
      position: [0, 0, 0],
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
