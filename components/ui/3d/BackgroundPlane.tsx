"use client"

import { useTexture } from "@react-three/drei"

export default function BackgroundPlane() {
  const texture = useTexture("/images/fond.jpg")

  return (
    <mesh position={[0, 0, -3]}>
      <planeGeometry args={[20, 20]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}