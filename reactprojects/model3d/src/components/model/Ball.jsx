/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ball.glb --draco 
Author: pergamond (https://sketchfab.com/pergamond)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/jaxa-iss-int-ball-92ca44b3453a4109823ba1751c58bf2b
Title: JAXA ISS Int-Ball
*/

import React, { useEffect } from 'react'
import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

import { useGLTF } from '@react-three/drei'

export function Ball(props) {
  const { nodes, materials } = useGLTF('model/ball.glb')
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={16.409}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[0, 0, -Math.PI / 2]} scale={0.945}>
            <group position={[0.007, 0, 0.001]} rotation={[-Math.PI, 0, -Math.PI]}>
              <mesh geometry={nodes.Object_12.geometry} material={materials.black_ball} />
              <mesh geometry={nodes.Object_13.geometry} material={materials.white_ball} />
            </group>
            <group position={[0, 0.007, 0.001]} rotation={[-Math.PI, 0, Math.PI / 2]} scale={0.95}>
              <mesh geometry={nodes.Object_15.geometry} material={materials.black_ball} />
              <mesh geometry={nodes.Object_16.geometry} material={materials.black_matt} />
            </group>
            <group position={[0, 0, 0.001]}>
              <mesh geometry={nodes.Object_18.geometry} material={materials.black_ball} />
              <mesh geometry={nodes.Object_19.geometry} material={materials.white_ball} />
            </group>
            <mesh geometry={nodes.Object_4.geometry} material={materials.black_ball} />
            <mesh geometry={nodes.Object_5.geometry} material={materials.white_ball} />
            <mesh geometry={nodes.Object_6.geometry} material={materials.black_shiny} />
            <mesh geometry={nodes.Object_7.geometry} material={materials.black_camera} />
            <mesh geometry={nodes.Object_8.geometry} material={materials.grey_button_interior} />
            <mesh geometry={nodes.Object_9.geometry} material={materials.black_matt} />
            <mesh geometry={nodes.Object_10.geometry} material={materials.MatrixDisplay} />
            <mesh geometry={nodes.Object_21.geometry} material={materials.MatrixDisplay} position={[0, 0, 0.001]} />
          </group>
        </group>
      </group>
    </group>
  )
}
function HoverBall() {
  const ballRef = useRef();
  const [target, setTarget] = useState([0, 0]);

  // Spring animation
  const { position } = useSpring({
    position: [target[0], target[1], -0.5], // Z stays fixed
    config: { mass: 1, tension: 170, friction: 26 },
  });

  // Update target when mouse moves
  const handlePointerMove = (e) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1
    const y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Clamp movement so ball doesn't go too far
    const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
    setTarget([
      clamp(x * 0.5, -0.5, 0.5), // X range
      clamp(y * 0.5, -0.5, 0.5), // Y range
    ]);
  };

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <animated.group position={position}>
      <Ball scale={[1.5, 1.5, 1.5]} />
    </animated.group>
  );
}


useGLTF.preload('model/ball.glb')
export default Ball;
