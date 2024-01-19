import { useRef } from "react";
import { useSpring, animated } from "@react-spring/three";

const Card = ({ position, args, value, flipped, onClick }) => {
  const cardRef = useRef();

  const { rotation } = useSpring({
    rotation: flipped ? [0, Math.PI, 0] : [0, 0, 0],
    config: { mass: 7, tension: 350, friction: 40 },
  });

  return (
    <animated.mesh
      position={position}
      ref={cardRef}
      onClick={onClick}
      rotation={rotation}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="white" />
    </animated.mesh>
  );
};

export default Card;