"use client"

import { Canvas } from "@react-three/fiber"
import LiquidGlassMesh from "./LiquidGlassMesh"

export default function LiquidGlassCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      style={{ height: 300 }}
    >
      <LiquidGlassMesh />
    </Canvas>
  )
}