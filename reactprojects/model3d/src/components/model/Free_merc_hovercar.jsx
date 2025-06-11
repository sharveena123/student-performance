import React, { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

export function FlyingCar(props) {
  const { nodes, materials } = useGLTF('model/free_merc_hovercar.glb');
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const [carPosition, setCarPosition] = useState([0, 0, 0]); // Track car's position

  // Track the mouse position on the screen
  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;  // Normalize to -1 to 1
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to 1
      setMousePosition([mouseX, mouseY]);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smoothly update car's position based on mouse position
  useEffect(() => {
    const smoothMove = () => {
      setCarPosition((prevPos) => {
        const lerpSpeed = 0.1; // The speed of transition, smaller = slower
        const newPos = [
          prevPos[0] + (mousePosition[0] * 3 - prevPos[0]) * lerpSpeed,
          prevPos[1] + (mousePosition[1] * 3 - prevPos[1]) * lerpSpeed,
          0, // Keep Z as 0
        ];
        return newPos;
      });
    };

    const interval = setInterval(smoothMove, 16); // roughly 60 FPS

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <group 
      {...props} 
      dispose={null}
      scale={hovered ? 0.6 : 0.5} // Slightly bigger when hovered
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      position={carPosition} // Use smooth position
    >
      <group 
        position={[0.019, -0.066, -0.047]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        scale={0.496}
      >
        <mesh geometry={nodes.Plane006_0.geometry} material={materials['Material.001']} />
        <mesh geometry={nodes.Plane006_1.geometry} material={materials.Material_light} />
        <mesh 
          geometry={nodes.Plane_0.geometry} 
          material={materials.Plane_0} 
          position={[0, 0, -0.582]} 
          scale={[1.187, 2, 1]} 
        />
      </group>
    </group>
  );
}

useGLTF.preload('model/free_merc_hovercar.glb');
