import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, Environment, PerspectiveCamera, Text, Center } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import { animated, useSpring } from "@react-spring/three";
import HoverBall from "../components/model/HoverBall.jsx";

function Loading() {
  return (
    <Text position={[0, 0, 0]} fontSize={0.3} color="white">
      Loading...
    </Text>
  );
}

// ⭐ New component for responsive scaling
function ResponsiveModel() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 6; // Adjust threshold if needed
  const scale = isMobile ? 1.2 : 1.0; // Smaller scale on mobile, bigger on desktop

  return (
    <Center>
      <HoverBall scale={1.7} />
    </Center>
  );
}

function ModelPage() {
  return (
    <>
      <title>GLB Model</title>
      <main className="relative px-5">
        {/* Main container for the 3D model and content */}
        <div className="flex items-center space-x-5">
          {/* 3D Model with absolute positioning */}
          <div className="relative w-[700px] h-[700px] rounded-full overflow-hidden flex-shrink-0">
            <Canvas>
              <PerspectiveCamera makeDefault fov={75} position={[0, 0, 2]} />
              <Suspense fallback={<Loading />}>
                <ResponsiveModel />
              </Suspense>
              <ambientLight intensity={1} />
              <Environment background={false} preset="city" />
            </Canvas>
          </div>

          {/* Cards or other content placed beside the model */}
          <div className="flex-1">
            <div className="p-4 border rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-3">Card Title 1</h2>
              <p>This is a description of the card. It can contain text, images, etc.</p>
            </div>
            <div className="p-4 border rounded-lg shadow-lg mt-4">
              <h2 className="text-xl font-bold mb-3">Card Title 2</h2>
              <p>This is another card. You can add any content here.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ModelPage;
