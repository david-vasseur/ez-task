"use client"

import { useFrame, extend, useThree } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

import { LiquidGlassMaterial } from "./LiquidGlassMaterial"

extend({ LiquidGlassMaterial })

export default function LiquidGlassMesh() {
  const ref = useRef<any>(null)

  const { viewport, mouse } = useThree()

  useFrame(({ clock }) => {
    if (!ref.current) return

    ref.current.uTime = clock.getElapsedTime()

    ref.current.uMouse.set(
      (mouse.x + 1) / 2,
      (mouse.y + 1) / 2
    )
  })

  return (
    <mesh>
      <planeGeometry args={[3, 1]} />

      <liquidGlassMaterial
        ref={ref}
        transparent
      />
    </mesh>
  )
}