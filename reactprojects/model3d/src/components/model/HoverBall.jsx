import { useRef, useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import {Robot1} from "./Robot1.jsx"; // Assuming Ball.jsx is another model you created

function HoverBall({scale=0.5}) {
  const ballRef = useRef();
  const [target, setTarget] = useState([0, 0]);

  const { position } = useSpring({
    position: [target[0], target[1], -0.5],
    config: { mass: 1, tension: 170, friction: 26 },
  });

  const handlePointerMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;

    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    setTarget([
      clamp(x * 0.5, -0.5, 0.5),
      clamp(y * 0.5, -0.5, 0.5),
    ]);
  };

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <animated.group position={position}>
      <Robot1 scale={[scale, scale, scale]} />
    </animated.group>
  );
}

export default HoverBall;
