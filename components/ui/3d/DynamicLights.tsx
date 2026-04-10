import { easing } from "maath";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function DynamicLights() {
  const lightRef = useRef(null);

  useFrame((state, delta) => {
    if (!lightRef.current) return;
    easing.damp3(
      lightRef.current.position,
      [state.pointer.x, state.pointer.y, -0.01],
      0.6,
      delta
    );
  });

  return (
    <>
      <directionalLight
        position={[0.4, 1, -0.2]}
        intensity={15}
        ref={lightRef}
      />
    </>
  );
}